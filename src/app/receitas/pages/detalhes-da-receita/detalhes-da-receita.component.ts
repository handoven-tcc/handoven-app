import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";
import { Subscription } from "rxjs";
import { ReceitasService } from "../../services";
import { ReceitasResponse } from "../../models";
import { FavoritosService } from "../../../favoritos/services";
import { NumberToFractionString } from "temp/src/lib/tools/utils";
import { AuthService } from "../../../auth/services";
import { GetFamiliaIdRequest } from "../../../auth/models";

@Component({
  selector: "app-detalhes-da-receita",
  templateUrl: "./detalhes-da-receita.component.html",
  styleUrls: ["./detalhes-da-receita.component.scss"],
})
export class DetalhesDaReceitaComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  receita!: ReceitasResponse;
  favorito: boolean = false;
  ios: boolean = false;
  android: boolean = false;
  receitasFavoritadas: string[] = [];

  constructor(
    private authService: AuthService,
    private receitasService: ReceitasService,
    private favoritosService: FavoritosService,
    private alertController: AlertController,
    private share: SocialSharing
  ) {}

  ngOnInit(): void {
    this.receita = JSON.parse(
      window.localStorage.getItem("receita") ?? ""
    ) as ReceitasResponse;

    this.loading = true;
    const requestFamilia = new GetFamiliaIdRequest(
      this.authService.getUsuarioId() ?? "",
      this.authService.getFamiliaId() ?? ""
    );
    this.inscricao = this.authService.getFamilia(requestFamilia).subscribe({
      next: (o) => {
        this.receitasFavoritadas = o.plates_favorites;
        this.favorito = this.receitasFavoritadas.includes(
          this.receita.id ?? ""
        );
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  formatToFraction(value: number): string {
    if (!value) {
      return "";
    }

    return NumberToFractionString(value) ?? "";
  }

  onClickAlterarFavorito(): void {
    if (!this.receita.id) {
      return;
    }

    const prevFavorited = this.favorito;
    const changedFavorited = !this.favorito;
    this.favorito = changedFavorited;

    if (this.loading) {
      this.favorito = prevFavorited;
      return;
    }

    this.loading = true;
    if (!changedFavorited) {
      this.inscricao = this.favoritosService
        .deleteFavorito(this.receita.id)
        .subscribe({
          next: (o: any) => {
            this.favorito = changedFavorited;
            this.loading = false;
          },
          error: () => {
            this.favorito = prevFavorited;
            this.loading = false;
          },
          complete: () => {
            this.loading = false;

            this.loading = true;
            this.inscricao = this.receitasService
              .getReceitaById(this.receita.id)
              .subscribe({
                next: (o) => {
                  this.receita = o;

                  this.loading = false;
                },
                error: () => (this.loading = false),
                complete: () => (this.loading = false),
              });
          },
        });
      return;
    }

    this.inscricao = this.favoritosService
      .putFavorito(this.receita.id)
      .subscribe({
        next: (o: any) => {
          this.favorito = changedFavorited;
          this.loading = false;
        },
        error: () => {
          this.favorito = prevFavorited;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;

          this.loading = true;
          this.inscricao = this.receitasService
            .getReceitaById(this.receita.id)
            .subscribe({
              next: (o) => {
                this.receita = o;

                this.loading = false;
              },
              error: () => (this.loading = false),
              complete: () => (this.loading = false),
            });
        },
      });
  }

  onClickCompartilhar(): void {
    if (this.loading) {
      return;
    }

    const mensagem: string = `
Olha só essa receita incrível que eu achei, no aplicativo do handoven!!!

${this.receita.name}
Em apenas ${this.tempoDePreparo(this.receita)}
Você rende ${this.rendimento(this.receita)} dessa deliciosa receita!

Para mais detalhes, baixe o aplicativo ou acesse:
    `;

    this.share
      .share(
        mensagem,
        "",
        "",
        `https://handoven-web.vercel.app/receitas/${this.receita.id}`
      )
      .then((o) => {
        console.log(o);
      })
      .catch((i) => {
        this.alertController
          .create({
            header: "Alguma coisa deu errado! Tente novamente mais tarde!",
            message: JSON.stringify(i),
          })
          .then((o) => o.present());
      });
  }

  tempoDePreparo(receita: ReceitasResponse): string {
    let tempo: string[] = receita.section.extras[0].split(": ");
    return tempo[1];
  }

  rendimento(receita: ReceitasResponse): string {
    let rendimento: string[] = receita.section.extras[1].split(": ");
    return rendimento[1];
  }

  ionViewWillLeave(): void {
    window.localStorage.removeItem("receita");
  }

  ionViewDidLeave(): void {
    window.localStorage.removeItem("receita");
  }

  ngOnDestroy(): void {
    window.localStorage.removeItem("receita");
  }
}

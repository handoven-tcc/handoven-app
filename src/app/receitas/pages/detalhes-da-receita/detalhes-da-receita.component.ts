import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";
import { Subscription } from "rxjs";
import { ReceitasService } from "../../services";
import { ReceitasResponse } from "../../models";
import { FavoritoRequest } from "../../../favoritos/models";
import { FavoritosService } from "../../../favoritos/services";
import { NumberToFractionString } from "temp/src/lib/tools/utils";

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

  constructor(
    private receitasService: ReceitasService,
    private favoritosService: FavoritosService,
    private alertController: AlertController,
    private share: SocialSharing
  ) {}

  ngOnInit(): void {
    this.receita = JSON.parse(
      window.localStorage.getItem("receita") ?? ""
    ) as ReceitasResponse;

    this.favorito = this.receita.favorited;
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

    const prevFavorited = this.receita.favorited;
    const changedFavorited = !this.receita.favorited;
    this.favorito = changedFavorited;

    if (this.loading) {
      this.favorito = prevFavorited;
      return;
    }

    this.loading = true;
    const request = new FavoritoRequest(this.receita.id, changedFavorited);
    this.inscricao = this.favoritosService.putFavorito(request).subscribe({
      next: (o) => {
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
      .share(mensagem, "", "", "https://github.com/handoven-tcc")
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

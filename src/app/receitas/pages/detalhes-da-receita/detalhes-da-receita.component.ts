import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";
import { Subscription } from "rxjs";
import { ReceitasService } from "../../services";
import { ReceitasResponse, ReceitaCategoria } from "../../models";

@Component({
  selector: "app-detalhes-da-receita",
  templateUrl: "./detalhes-da-receita.component.html",
  styleUrls: ["./detalhes-da-receita.component.scss"],
})
export class DetalhesDaReceitaComponent implements OnInit {
  receita!: ReceitasResponse;
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private receitasServices: ReceitasService,
    private alertController: AlertController,
    private share: SocialSharing
  ) {}

  ngOnInit(): void {
    this.receita = JSON.parse(
      window.localStorage.getItem("receita") ?? ""
    ) as ReceitasResponse;
  }

  onClickAdicionarFavorito(): void {
    this.alertNaoImplementado();
  }

  onClickCompartilhar(): void {
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

  alertNaoImplementado(): void {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
        buttons: ["Ok"],
      })
      .then((o) => o.present());
  }

  ionViewWillLeave(): void {
    window.localStorage.removeItem("receita");
    // this.receita = JSON.parse(window.localStorage.getItem("receita") ?? "") as ReceitasResponse;
  }
  ionViewDidLeave(): void {
    window.localStorage.removeItem("receita");
    // this.receita = JSON.parse(window.localStorage.getItem("receita") ?? "") as ReceitasResponse;
  }

  ngOnDestroy(): void {
    window.localStorage.removeItem("receita");
    // this.receita = JSON.parse(window.localStorage.getItem("receita") ?? "") as ReceitasResponse;
  }
}

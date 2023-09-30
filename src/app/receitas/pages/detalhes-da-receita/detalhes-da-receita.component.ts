import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ReceitasService } from "../../services";
import { ReceitasResponse } from "../../../favoritos/models";
import { ReceitaCategoria } from "../../models";

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
  ) {
  }

  ngOnInit(): void {
    this.receita = JSON.parse(window.localStorage.getItem("receita") ?? "") as ReceitasResponse;
  }

  onClickAdicionarFavorito(): void {
    this.alertNaoImplementado();
  }
  onClickCompartilhar(): void {
    this.alertNaoImplementado();
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

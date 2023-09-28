import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import { ReceitasService } from "../../services";
import { ReceitasResponse } from "../../../favoritos/models";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-listar-receitas",
  templateUrl: "./listar-receitas.component.html",
  styleUrls: ["./listar-receitas.component.scss"],
})
export class ListarReceitasComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  receitas: ReceitasResponse[] = [];


  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private receitaService: ReceitasService) {
  }

  public get hasReceitas(): boolean {
    return this.receitas.length > 0;
  }

  public get usuarioLogado(): boolean {
    return this.authService.hasUsuario();
  }

  ngOnInit(): void {
    this.getTodasReceitas();
  }

  ionViewWillEnter(): void {
    this.getTodasReceitas();
  }

  getTodasReceitas(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.loading = false;
        event.target.complete();
      },
      error: () => {
        this.loading = false;
        event.target.complete();
      },
      complete: () => {
        this.loading = false;
        event.target.complete();
      },
    });
  }

  onClickRefresh(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
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

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

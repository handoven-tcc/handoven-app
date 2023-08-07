import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import {
  DeletarUsuarioRequest,
  GetFamiliaIdRequest,
} from "../../../auth/models";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-listar-perfil",
  templateUrl: "./listar-perfil.component.html",
  styleUrls: ["./listar-perfil.component.scss"],
})
export class ListarPerfilComponent implements OnInit {
  inscricaoNomeFamilia!: Subscription;
  inscricaoTodosUsuariosDaFamilia!: Subscription;
  inscricaoDeletarUsuario!: Subscription;
  inscricaoDeleteAll!: Subscription;
  loading: boolean = false;
  nomeFamilia: string = "Anônima";
  familyId!: string;
  userId!: string;
  // TODO: fazer verificação pessoa responsável da familia
  pessoaResponsavel: boolean = false;
  emails!: string[];

  public alertButtons = ["OK"];

  public alertButtonsSair = [
    { text: "Cancel", role: "cancel", handler: () => null },
    {
      text: "OK",
      role: "confirm",
      handler: () => this.sair(),
    },
  ];
  public alertButtonsExcluirPerfil = [
    { text: "Cancel", role: "cancel", handler: () => null },
    {
      text: "OK",
      role: "confirm",
      handler: () => this.onClickExcluirUsuario(),
    },
  ];
  public alertButtonsExcluirFamilia = [
    { text: "Cancel", role: "cancel", handler: () => null },
    {
      text: "OK",
      role: "confirm",
      handler: () => this.onClickExcluirFamilia(),
    },
  ];

  public get usuarioLogado(): boolean {
    if (this.familyId && this.userId) {
      return true;
    }
    return false;
  }

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.familyId = window.localStorage.getItem("X-HandOven-Family") ?? "";
    this.userId = window.localStorage.getItem("X-HandOven-User") ?? "";

    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.userId,
      this.familyId
    );

    this.loading = true;
    this.inscricaoNomeFamilia = this.authService
      .getNomeFamilia(request)
      .subscribe((res) => {
        if (res.name) {
          this.nomeFamilia = res.name;
          // this.pessoaResponsavel = res.emails.filter(o => o.responsavel == true);
          // this.emails = res.emailsIntegrantes;
        }
        this.loading = false;
      });

    this.loading = true;
    this.inscricaoTodosUsuariosDaFamilia = this.authService
      .getTodosUsuariosDaFamilia(request)
      .subscribe((res) => {
        // TODO: ordenar, seu email primeiro dps os outros
        this.emails = res.map((i) => i.email);
        this.loading = false;
      });
  }

  onClickReload() {
    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.userId,
      this.familyId
    );

    this.loading = true;
    this.inscricaoTodosUsuariosDaFamilia = this.authService
      .getTodosUsuariosDaFamilia(request)
      .subscribe((res) => {
        // TODO: ordenar, seu email primeiro dps os outros
        this.emails = res.map((i) => i.email);
        this.loading = false;
      });
  }

  onClickModalSair() {
    if (!this.usuarioLogado) {
      this.sair();
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message: "Esta ação pode te fazer sair do seu perfil atual",
        buttons: this.alertButtonsSair,
      })
      .then((o) => o.present());
  }

  sair() {
    this.authService.logout();
    window.location.reload();
  }

  onClickExcluirUsuario() {
    const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
      this.userId,
      this.familyId
    );

    this.inscricaoDeletarUsuario = this.authService
      .deletarUsuario(request)
      .subscribe((o) => o);

    this.authService.logout();
    window.location.reload();
  }

  onClickExcluirFamilia() {
    const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
      this.userId,
      this.familyId
    );

    this.inscricaoDeleteAll = this.authService
      .deleteAll(request)
      .subscribe((o) => o);

    this.authService.logout();
    window.location.reload();
  }

  alertNaoImplementado() {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
        buttons: ["Ok"],
      })
      .then((o) => o.present());
  }

  onClickAdicionarUsuario() {
    this.alertNaoImplementado();
  }

  onClickVerificarEmail() {
    this.alertNaoImplementado();
  }

  onClickEditarPerfil() {
    this.nav.navigateForward(["tabs/perfil/editar-perfil", 1]);
  }

  ngOnDestroy(): void {
    this.inscricaoTodosUsuariosDaFamilia.unsubscribe();
    this.inscricaoNomeFamilia.unsubscribe();
    this.inscricaoDeletarUsuario.unsubscribe();
    this.inscricaoDeleteAll.unsubscribe();
  }
}

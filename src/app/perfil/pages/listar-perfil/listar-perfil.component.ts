import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import {
  DeletarUsuarioRequest,
  EditarFamiliaRequest,
  GetFamiliaIdRequest,
  UsuarioResponse,
} from "../../../auth/models";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-listar-perfil",
  templateUrl: "./listar-perfil.component.html",
  styleUrls: ["./listar-perfil.component.scss"],
})
export class ListarPerfilComponent implements OnInit {
  inscricaoNomeFamilia: Subscription = Subscription.EMPTY;
  inscricaoEditarFamilia: Subscription = Subscription.EMPTY;
  inscricaoTodosUsuariosDaFamilia: Subscription = Subscription.EMPTY;
  inscricaoDeletarUsuario: Subscription = Subscription.EMPTY;
  inscricaoDeleteAll: Subscription = Subscription.EMPTY;

  loading: boolean = false;
  nomeFamilia: string = "Anônima";
  familiaId!: string;
  usuarioId!: string;
  // TODO: fazer verificação pessoa responsável da familia
  perfilResponsavel: boolean = false;
  emails: string[] = ["Você"];
  perfil!: UsuarioResponse;

  public alertButtons = ["OK"];

  public alertButtonsExcluirFamilia = [
    { text: "Cancel", role: "cancel", handler: () => null },
    {
      text: "OK",
      role: "confirm",
      handler: () => this.excluirFamilia(),
    },
  ];

  public get usuarioLogado(): boolean {
    return this.authService.hasUsuario();
  }

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private nav: NavController
  ) {
    this.familiaId = this.authService.getFamiliaId();
    this.usuarioId = this.authService.getUsuarioId();
  }

  ngOnInit(): void {
    const user = window.localStorage.getItem("user");
    if (user) {
      this.perfil = JSON.parse(user);
    }

    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );

    this.loading = true;
    this.inscricaoNomeFamilia = this.authService
      .getNomeFamilia(request)
      .subscribe({
        next: (res) => {
          if (res.name) {
            this.nomeFamilia = res.name;
            // this.pessoaResponsavel = res.emails.filter(o => o.responsavel == true);
            // this.emails = res.emailsIntegrantes;
          }
          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });

    this.loading = true;
    this.inscricaoTodosUsuariosDaFamilia = this.authService
      .getTodosUsuariosDaFamilia(request)
      .subscribe({
        next: (res) => {
          if (res[0].email) {
            // TODO: ordenar, seu email primeiro dps os outros
            this.emails = res.map((i) => i.email);
          }
          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  onClickRefresh(): void {
    if (this.loading === true) {
      return;
    }

    this.loading = true;
    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );

    this.inscricaoTodosUsuariosDaFamilia = this.authService
      .getTodosUsuariosDaFamilia(request)
      .subscribe({
        next: (o) => {
          // TODO: ordenar, seu email primeiro dps os outros
          this.emails = o.map((i) => i.email);
          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  handleRefresh(event: any): void {
    if (this.loading === true) {
      return;
    }

    this.loading = true;
    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );

    this.inscricaoTodosUsuariosDaFamilia = this.authService
      .getTodosUsuariosDaFamilia(request)
      .subscribe({
        next: (o) => {
          // TODO: ordenar, seu email primeiro dps os outros
          this.emails = o.map((i) => i.email);
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

  onClickAdicionarUsuario(): void {
    if (this.loading === true) {
      return;
    }

    this.nav.navigateForward(["tabs/perfil/adicionar-integrante"]);
  }

  onClickEditarPerfil(): void {
    if (this.loading === true) {
      return;
    }

    this.nav.navigateForward(["tabs/perfil/editar-perfil"]);
  }

  excluirUsuario(): void {
    if (this.loading === true) {
      return;
    }

    this.loading = true;
    const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
      this.usuarioId,
      this.familiaId
    );

    this.inscricaoDeletarUsuario = this.authService
      .deletarUsuario(request)
      .subscribe({
        next: (o) => {
          this.loading = false;
          return o;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });

    this.sair();
  }

  excluirFamilia(): void {
    this.alertNaoImplementado();
    // const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
    //   this.userId,
    //   this.familyId
    // );

    // this.inscricaoDeleteAll = this.authService
    //   .deleteAll(request)
    //   .subscribe({
    //     next: (o) => {
    //       this.loading = false;
    //       return o;
    //     },
    //     error: () => (this.loading = false),
    //     complete: () => (this.loading = false),
    //   });

    // this.authService.logout();
    // window.location.reload();
  }

  editarFamilia(nomeFamilia: string): void {
    if (this.loading === true) {
      return;
    }

    this.loading = true;
    const request: EditarFamiliaRequest = new EditarFamiliaRequest(
      this.familiaId,
      nomeFamilia
    );

    this.inscricaoEditarFamilia = this.authService
      .editarFamilia(request)
      .subscribe({
        next: (o) => {
          this.perfil.familyId = o.id;
          window.localStorage.setItem("user", JSON.stringify(this.perfil));
          this.nomeFamilia = o.name;

          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  //#region Modais
  onClickModalEditarFamilia(): void {
    this.alertController
      .create({
        header: "Favor, insira o nome da familia",
        inputs: [
          {
            name: "nomeFamilia",
            placeholder: "Nome da familia",
            type: "text",
            attributes: {
              minlength: 3,
            },
          },
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: (alertData) => this.editarFamilia(alertData.nomeFamilia),
          },
        ],
      })
      .then((o) => o.present());
  }

  onClickModalVerificarEmail(): void {
    if (this.loading === true) {
      return;
    }

    this.alertNaoImplementado();
  }

  onClickModalSair(): void {
    if (!this.usuarioLogado) {
      this.sair();
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message: "Esta ação pode te fazer sair do seu perfil atual",
        buttons: [
          { text: "Cancel", role: "cancel", handler: () => null },
          {
            text: "OK",
            role: "confirm",
            handler: () => this.sair(),
          },
        ],
      })
      .then((o) => o.present());
  }

  onClickModalExcluirPerfil(): void {
    if (this.loading === true) {
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message:
          "Esta ação te fará excluir seu perfil permanentemente, você tem certeza disso?",
        buttons: [
          { text: "Cancel", role: "cancel", handler: () => null },
          {
            text: "OK",
            role: "confirm",
            handler: () => this.excluirUsuario(),
          },
        ],
      })
      .then((o) => o.present());
  }

  onClickModalExcluirFamilia(): void {
    if (this.loading === true) {
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message:
          "Esta ação te fará excluir sua familia e TODOS os integrantes dela permanentemente, você tem certeza disso?",
        buttons: [
          { text: "Cancel", role: "cancel", handler: () => null },
          {
            text: "OK",
            role: "confirm",
            handler: () => this.excluirFamilia(),
          },
        ],
      })
      .then((o) => o.present());
  }
  //#endregion

  //#region Utils
  alertNaoImplementado(): void {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
        buttons: ["Ok"],
      })
      .then((o) => o.present());
  }

  sair(): void {
    this.authService.logout();
    window.location.reload();
  }
  //#endregion

  ngOnDestroy(): void {
    this.inscricaoTodosUsuariosDaFamilia.unsubscribe();
    this.inscricaoEditarFamilia.unsubscribe();
    this.inscricaoNomeFamilia.unsubscribe();
    this.inscricaoDeletarUsuario.unsubscribe();
    this.inscricaoDeleteAll.unsubscribe();
  }
}

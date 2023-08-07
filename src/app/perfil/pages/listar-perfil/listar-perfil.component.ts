import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import {
  DeletarUsuarioRequest,
  EditarFamiliaRequest,
  FamiliaRequest,
  GetFamiliaIdRequest,
  UsuarioResponse,
} from "../../../auth/models";
import { AlertController, AlertInput, NavController } from "@ionic/angular";

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
  familyId!: string;
  userId!: string;
  // TODO: fazer verificação pessoa responsável da familia
  perfilResponsavel: boolean = true;
  emails: string[] = ["Você"];
  perfil!: UsuarioResponse;

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
    const user = window.localStorage.getItem("user");
    if (user) {
      this.perfil = JSON.parse(user);
    }

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
        if (res[0].email) {
          // TODO: ordenar, seu email primeiro dps os outros
          this.emails = res.map((i) => i.email);
        }
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
    console.log("opa");

    // const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
    //   this.userId,
    //   this.familyId
    // );

    // this.inscricaoDeleteAll = this.authService
    //   .deleteAll(request)
    //   .subscribe((o) => o);

    // this.authService.logout();
    // window.location.reload();
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
    this.nav.navigateForward(["tabs/perfil/editar-perfil"]);
  }

  onClickModalEditarFamilia() {
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
            handler: (alertData) =>
              this.onClickEditarFamilia(alertData.nomeFamilia),
          },
        ],
      })
      .then((o) => o.present());
  }

  onClickEditarFamilia(nomeFamilia: string) {
    const request: EditarFamiliaRequest = new EditarFamiliaRequest(
      this.familyId,
      nomeFamilia
    );

    this.inscricaoEditarFamilia = this.authService
      .editarFamilia(request)
      .subscribe((o) => {
        console.log(o);
        this.perfil.familyId = o.id;
        window.localStorage.setItem("user", JSON.stringify(this.perfil));
        this.nomeFamilia = o.name;
      });
  }

  ngOnDestroy(): void {
    this.inscricaoTodosUsuariosDaFamilia.unsubscribe();
    this.inscricaoEditarFamilia.unsubscribe();
    this.inscricaoNomeFamilia.unsubscribe();
    this.inscricaoDeletarUsuario.unsubscribe();
    this.inscricaoDeleteAll.unsubscribe();
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import {
  DeletarUsuarioRequest,
  GetFamiliaIdRequest,
} from "../../../auth/models";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-listar-perfil",
  templateUrl: "./listar-perfil.component.html",
  styleUrls: ["./listar-perfil.component.scss"],
})
export class ListarPerfilComponent implements OnInit {
  inscricao!: Subscription;
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
      handler: () => this.onClickSair(),
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

  public get podeExcluir(): boolean {
    if (this.familyId && this.userId) {
      return true;
    }
    return false;
  }

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.familyId = window.localStorage.getItem("X-HandOven-Family") ?? "";
    this.userId = window.localStorage.getItem("X-HandOven-User") ?? "";

    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.userId,
      this.familyId
    );

    this.loading = true;
    this.inscricao = this.authService
      .getNomeFamilia(request)
      .subscribe((res) => {
        if (res.name) {
          this.nomeFamilia = res.name;
          // this.pessoaResponsavel = res.emails.filter(o => o.responsavel == true);
          // this.emails = res.emailsIntegrantes;
        }
        this.loading = false;
      });

    this.emails = [
      "Você",
      "outro@email.com",
      "segundo@email.com",
      "terceito@email.com",
      "quarto@email.com",
      "quinto@email.com",
      "sexto@email.com",
      "sabado?@email.com",
      "domingao👀@email.com",
      "grande_email_pra_mostrar_os_3pontinhos@email.com",
      "grandeemailpramostraro1pontinhos@email.com",
      "grandeemailpramostraro2pontinhos@email.com",
      "grandeemailpramostraro3pontinhos@email.com",
      "grandeemailpramostraro4pontinhos@email.com",
      "grandeemailpramostraro5pontinhos@email.com",
    ];
  }

  onClickReload() {
    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.userId,
      this.familyId
    );

    this.loading = true;
    this.inscricao = this.authService
      .getNomeFamilia(request)
      .subscribe((res) => {
        if (res.name) {
          this.nomeFamilia = res.name;
          // this.pessoaResponsavel = res.emails.filter(o => o.responsavel == true);
          // this.emails = res.emailsIntegrantes;
        }
        this.loading = false;
      });
  }

  onClickSair() {
    this.authService.logout();
    window.location.reload();
  }

  onClickExcluirUsuario() {
    const request: DeletarUsuarioRequest = new DeletarUsuarioRequest(
      this.userId,
      this.familyId
    );

    this.inscricao = this.authService
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

    this.inscricao = this.authService.deleteAll(request).subscribe((o) => o);

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
    this.alertNaoImplementado();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

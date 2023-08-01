import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";
import { Subscription } from "rxjs";
import {
  DeletarUsuarioRequest,
  GetFamiliaIdRequest,
} from "../../../auth/models";

@Component({
  selector: "app-listar-perfil",
  templateUrl: "./listar-perfil.component.html",
  styleUrls: ["./listar-perfil.component.scss"],
})
export class ListarPerfilComponent implements OnInit {
  inscricao!: Subscription;
  nomeFamilia: string = "Anônima";
  familyId!: string;
  userId!: string;
  // TODO: fazer verificação pessoa responsável da familia
  pessoaResponsavel: boolean = false;

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.familyId = window.localStorage.getItem("X-HandOven-Family") ?? "";
    this.userId = window.localStorage.getItem("X-HandOven-User") ?? "";

    const request: GetFamiliaIdRequest = new GetFamiliaIdRequest(
      this.userId,
      this.familyId
    );

    this.inscricao = this.authService
      .getNomeFamilia(request)
      .subscribe((res) => {
        if (res.name) {
          this.nomeFamilia = res.name;
        }
      });
  }

  onClickAdicionarUsuario() {}

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

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

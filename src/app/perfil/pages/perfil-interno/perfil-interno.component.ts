import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../../auth/services";
import { Router } from "@angular/router";
import { DeletarUsuarioRequest } from "../../../auth/models";

@Component({
  selector: "app-perfil-interno",
  templateUrl: "./perfil-interno.component.html",
  styleUrls: ["./perfil-interno.component.scss"],
})
export class PerfilInternoComponent implements OnInit {
  inscricaoUsuario: Subscription = Subscription.EMPTY;
  inscricaoUsuarioFamilia: Subscription = Subscription.EMPTY;
  usuarioId!: string;
  familiaId!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuarioId = window.localStorage.getItem("X-HandOven-User") ?? "";
    this.familiaId = window.localStorage.getItem("X-HandOven-Family") ?? "";
  }

  onClickDeletarUsuario() {
    const request = new DeletarUsuarioRequest(this.usuarioId, this.familiaId);

    this.inscricaoUsuario = this.authService
      .deletarUsuario(request)
      .subscribe((_) => {
        this.router.navigate(["/auth/home"]);
      });
  }

  onClickDeletarUsuarioFamilia() {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.inscricaoUsuario.unsubscribe();
  }
}

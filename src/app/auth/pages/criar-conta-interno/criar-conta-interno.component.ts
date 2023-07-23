import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services";
import { FamiliaRequest, UsuarioRequest } from "../../models";
import { Subscription } from "rxjs";
import {} from "@angular/forms";
import { IonInput } from "@ionic/angular";
import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-criar-conta-interno",
  templateUrl: "./criar-conta-interno.component.html",
  styleUrls: ["./criar-conta-interno.component.scss"],
})
export class CriarContaInternoComponent implements OnInit {
  inscricaoFamilia: Subscription = Subscription.EMPTY;
  inscricaoUsuario: Subscription = Subscription.EMPTY;

  nomeDaFamilia!: string;
  nome!: string;
  email!: string;
  celular!: string;
  dataDeNascimento!: string;
  senha!: string;
  senhaRepetida!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.nomeDaFamilia = this.activatedRoute.snapshot.params["nomeDaFamilia"];
    this.email = this.activatedRoute.snapshot.params["email"];
  }

  onClickCriarConta() {
    if (this.senha !== this.senhaRepetida) {
      return;
    }
    const requestFamilia = new FamiliaRequest(this.nomeDaFamilia);
    let requestUsuario = new UsuarioRequest(
      this.nome,
      this.dataDeNascimento,
      this.celular,
      this.email,
      this.senha,
      ""
    );

    this.inscricaoFamilia = this.authService
      .criarFamilia(requestFamilia)
      .subscribe((o) => {
        if (o) {
          requestUsuario.familyId = o.id;

          this.inscricaoUsuario = this.authService
            .criarUsuario(requestUsuario)
            .subscribe((i) => {
              console.log("funcionou??", i);
              this.router.navigate(["auth/sucesso"]);
            });
        }
      });
  }

  onClickTirarFoto() {
    console.log("foto tirada!");
  }

  ngOnDestroy(): void {
    this.inscricaoFamilia.unsubscribe();
    this.inscricaoUsuario.unsubscribe();
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services";
import { FamiliaRequest } from "../../models";
import { Subscription } from "rxjs";
import {} from "@angular/forms";
import { IonInput } from "@ionic/angular";
import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-criar-conta-interno",
  templateUrl: "./criar-conta-interno.component.html",
  styleUrls: ["./criar-conta-interno.component.scss"],
})
export class CriarContaInternoComponent implements OnInit {
  inscricao: Subscription = Subscription.EMPTY;
  inputModel = "";
  @ViewChild("ionInputEl", { static: true }) ionInputEl!: IonInput;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onInput(event: any) {
    const value = event.target!.value;
    const alphanumFilter = value.replace(/[^a-zA-Z0-9]+/g, "");
    this.ionInputEl.value = this.inputModel = alphanumFilter;
  }

  onClickCriarFamilia() {
    if (!this.ionInputEl.value) {
      return;
    }
    const request = new FamiliaRequest(this.ionInputEl.value.toString());

    this.inscricao = this.authService.criarFamilia(request).subscribe((o) => {
      if (o) {
        this.router.navigate(["tabs/receitas"]);
      }
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

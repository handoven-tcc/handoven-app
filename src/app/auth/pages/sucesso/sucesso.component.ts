import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-sucesso",
  templateUrl: "./sucesso.component.html",
  styleUrls: ["./sucesso.component.scss"],
})
export class SucessoComponent implements OnInit {
  acao: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.acao = this.activatedRoute.snapshot.params["acao"];

    setTimeout(() => {
      this.router.navigate(["tabs/receitas"]);
    }, 5000);
  }

  onClickComecarAgora() {
    this.router.navigate(["tabs/receitas"]);
  }
}

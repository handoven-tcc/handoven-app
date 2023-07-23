import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sucesso",
  templateUrl: "./sucesso.component.html",
  styleUrls: ["./sucesso.component.scss"],
})
export class SucessoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["tabs/receitas"]);
    }, 5000);
  }

  onClickComecarAgora() {
    this.router.navigate(["tabs/receitas"]);
  }
}

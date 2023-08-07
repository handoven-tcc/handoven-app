import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";

@Component({
  selector: "app-listar-receitas",
  templateUrl: "./listar-receitas.component.html",
  styleUrls: ["./listar-receitas.component.scss"],
})
export class ListarReceitasComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../auth/services";

@Component({
  selector: "app-listar-dispensa",
  templateUrl: "./listar-dispensa.component.html",
  styleUrls: ["./listar-dispensa.component.scss"],
})
export class ListarDispensaComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}

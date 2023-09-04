import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductsResponse } from "../../models";
import { DispensaService } from "../../services";

@Component({
  selector: "app-listar-dispensa",
  templateUrl: "./listar-dispensa.component.html",
  styleUrls: ["./listar-dispensa.component.scss"],
})
export class ListarDispensaComponent implements OnInit {
  listaDeProdutos: ProductsResponse[] = [];
  inscricao: Subscription = Subscription.EMPTY;

  constructor(private dispensaService: DispensaService) {}

  ngOnInit() {
    this.inscricao = this.dispensaService.getAllProducts().subscribe((o) => {
      console.log(o);
      this.listaDeProdutos = o;
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AuthService } from "../../../auth/services";
import { ReceitasService } from "../../services";
import {
  AlgoritmoResponse,
  ReceitaCategoria,
  ReceitasResponse,
} from "../../models";

@Component({
  selector: "app-listar-receitas",
  templateUrl: "./listar-receitas.component.html",
  styleUrls: ["./listar-receitas.component.scss"],
})
export class ListarReceitasComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  receitas: ReceitasResponse[] = [];
  receitasAlgoritmo!: AlgoritmoResponse;
  categorias: ReceitaCategoria[] = [];
  responsiveOptions: any[] = [];
  resultadosReceitas: ReceitasResponse[] = [];
  resultadosCategorias: ReceitaCategoria[] = [];
  protected readonly ReceitaCategoria = ReceitaCategoria;

  constructor(
    private authService: AuthService,
    private nav: NavController,
    private receitaService: ReceitasService
  ) {}

  public get hasReceitas(): boolean {
    return this.receitas.length > 0;
  }

  public get hasUsuario(): boolean {
    return this.authService.hasUsuario();
  }

  public get hasReceitaAlgoritmo(): boolean {
    return (
      this.authService.hasUsuario() &&
      this.receitasAlgoritmo.available_plates.length > 0
    );
  }

  ngOnInit(): void {
    this.getTodasReceitas();
    this.responsiveOptions = [
      {
        breakpoint: "1199px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "991px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.getAlgoritmo();
  }

  ionViewWillEnter(): void {
    this.getTodasReceitas();
    this.getAlgoritmo();
  }

  public receitaPorCategoria(categoria: number) {
    return this.resultadosReceitas
      .filter((o) => o.category == categoria)
      .slice(0, 3);
  }

  public receitaAlgoritmo() {
    return this.receitasAlgoritmo.available_plates.slice(0, 3);
  }

  getTodasReceitas(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.resultadosReceitas = this.receitas;

        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => {
        this.loading = false;

        this.loading = true;
        this.inscricao = this.receitaService.getAllCategorias().subscribe({
          next: (o: any[]): void => {
            this.categorias = o;
            this.resultadosCategorias = this.categorias;
            this.loading = false;
          },
          error: () => (this.loading = false),
          complete: () => (this.loading = false),
        });
      },
    });
  }

  getAlgoritmo(): void {
    this.loading = true;
    this.inscricao = this.receitaService.getAlgoritmo().subscribe({
      next: (o: AlgoritmoResponse): void => {
        this.receitasAlgoritmo = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.resultadosReceitas = this.receitas.filter(
      (r) => r.name.toLowerCase().indexOf(query) > -1
    );
    let categorias = this.resultadosReceitas.map((o) => o.category);
    this.resultadosCategorias = categorias.filter(
      (n, i) => categorias.indexOf(n) === i
    );
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.loading = false;
        event.target.complete();
      },
      error: () => {
        this.loading = false;
        event.target.complete();
      },
      complete: () => {
        this.loading = false;
        event.target.complete();
      },
    });

    this.getAlgoritmo();
  }

  onClickRefresh(): void {
    if (this.loading || !this.hasReceitas) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitaService.getAllReceitas().subscribe({
      next: (o: ReceitasResponse[]): void => {
        this.receitas = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });

    this.getAlgoritmo();
  }

  onClickVerMais(item: ReceitaCategoria): void {
    this.nav.navigateForward(["tabs/receitas/ver-mais", JSON.stringify(item)]);
  }

  onClickVisualizarReceita(receita: ReceitasResponse): void {
    window.localStorage.setItem("receita", JSON.stringify(receita));
    this.nav.navigateForward(["tabs/receitas/detalhes"]);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, map, of } from "rxjs";
import {
  ProdutoRequest,
  DeletarProdutoRequest,
  GetProdutoNomeRequest,
  GetProdutoIdRequest,
  ProdutoResponse,
  IButtonSelect,
  IButtonSelectComAbreviacao,
} from "../models";
import { AuthService } from "../../auth/services";
import { BarcodeScanResult } from "@awesome-cordova-plugins/barcode-scanner";
import {
  ReceitaIngredienteCategoria,
  ReceitaIngredienteUnidadeDeMedida,
} from "../../receitas/models";

@Injectable({
  providedIn: "root",
})
export class DispensaService {
  private familiaId!: string;
  private usuarioId!: string;
  private readonly tipo: IButtonSelect[] = [];
  private readonly categoria: IButtonSelect[] = [];
  private readonly unidadeDeMedida: IButtonSelectComAbreviacao[] = [];

  private get url(): string {
    return `${environment.api}/products`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService // private storage: StorageService,
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";

    this.tipo = [
      {
        id: 1,
        name: "Açúcar e Adoçante",
        code: "ACUCAR_ADOCANTE",
      },
      {
        id: 2,
        name: "Condimento",
        code: "CONDIMENTO",
      },
      {
        id: 3,
        name: "Doce",
        code: "DOCE",
      },
      {
        id: 4,
        name: "Especiaria",
        code: "ESPECIARIA",
      },
      {
        id: 5,
        name: "Fruta",
        code: "FRUTA",
      },
      {
        id: 6,
        name: "Grão",
        code: "GRAO",
      },
      {
        id: 7,
        name: "Lácteo",
        code: "LACTEO",
      },
      {
        id: 8,
        name: "Molho",
        code: "MOLHO",
      },
      {
        id: 9,
        name: "Noz e Semente",
        code: "NOZ_SEMESTRE",
      },
      {
        id: 10,
        name: "Massa",
        code: "MASSA",
      },
      {
        id: 11,
        name: "Vegetal",
        code: "VEGETAL",
      },
    ];
    this.categoria = [
      {
        id: ReceitaIngredienteCategoria.Outros,
        name: ReceitaIngredienteCategoria[0],
        code: ReceitaIngredienteCategoria[0],
      },
      {
        id: ReceitaIngredienteCategoria["Açúcares"],
        name: ReceitaIngredienteCategoria[1],
        code: ReceitaIngredienteCategoria[1],
      },
      {
        id: ReceitaIngredienteCategoria.Bebidas,
        name: ReceitaIngredienteCategoria[2],
        code: ReceitaIngredienteCategoria[2],
      },
      {
        id: ReceitaIngredienteCategoria.Carnes,
        name: ReceitaIngredienteCategoria[3],
        code: ReceitaIngredienteCategoria[3],
      },
      {
        id: ReceitaIngredienteCategoria.Chocolates,
        name: ReceitaIngredienteCategoria[4],
        code: ReceitaIngredienteCategoria[4],
      },
      {
        id: ReceitaIngredienteCategoria.Condimentos,
        name: ReceitaIngredienteCategoria[5],
        code: ReceitaIngredienteCategoria[5],
      },
      {
        id: ReceitaIngredienteCategoria.Conservas,
        name: ReceitaIngredienteCategoria[6],
        code: ReceitaIngredienteCategoria[6],
      },
      {
        id: ReceitaIngredienteCategoria.Farinhas,
        name: ReceitaIngredienteCategoria[7],
        code: ReceitaIngredienteCategoria[7],
      },
      {
        id: ReceitaIngredienteCategoria.Frutas,
        name: ReceitaIngredienteCategoria[8],
        code: ReceitaIngredienteCategoria[8],
      },
      {
        id: ReceitaIngredienteCategoria.Fungos,
        name: ReceitaIngredienteCategoria[9],
        code: ReceitaIngredienteCategoria[9],
      },
      {
        id: ReceitaIngredienteCategoria.Gorduras,
        name: ReceitaIngredienteCategoria[10],
        code: ReceitaIngredienteCategoria[10],
      },
      {
        id: ReceitaIngredienteCategoria["Grãos"],
        name: ReceitaIngredienteCategoria[11],
        code: ReceitaIngredienteCategoria[11],
      },
      {
        id: ReceitaIngredienteCategoria["Laticínios"],
        name: ReceitaIngredienteCategoria[12],
        code: ReceitaIngredienteCategoria[12],
      },
      {
        id: ReceitaIngredienteCategoria.Legumes,
        name: ReceitaIngredienteCategoria[13],
        code: ReceitaIngredienteCategoria[13],
      },
      {
        id: ReceitaIngredienteCategoria["Líquidos"],
        name: ReceitaIngredienteCategoria[14],
        code: ReceitaIngredienteCategoria[14],
      },
      {
        id: ReceitaIngredienteCategoria.Massas,
        name: ReceitaIngredienteCategoria[15],
        code: ReceitaIngredienteCategoria[15],
      },
      {
        id: ReceitaIngredienteCategoria.Molhos,
        name: ReceitaIngredienteCategoria[16],
        code: ReceitaIngredienteCategoria[16],
      },
      {
        id: ReceitaIngredienteCategoria["Pães"],
        name: ReceitaIngredienteCategoria[17],
        code: ReceitaIngredienteCategoria[17],
      },
      {
        id: ReceitaIngredienteCategoria.Peixes,
        name: ReceitaIngredienteCategoria[18],
        code: ReceitaIngredienteCategoria[18],
      },
      {
        id: ReceitaIngredienteCategoria["Proteína"],
        name: ReceitaIngredienteCategoria[19],
        code: ReceitaIngredienteCategoria[19],
      },
      {
        id: ReceitaIngredienteCategoria.Temperos,
        name: ReceitaIngredienteCategoria[20],
        code: ReceitaIngredienteCategoria[20],
      },
      {
        id: ReceitaIngredienteCategoria.Vegetais,
        name: ReceitaIngredienteCategoria[21],
        code: ReceitaIngredienteCategoria[21],
      },
      {
        id: ReceitaIngredienteCategoria.Verduras,
        name: ReceitaIngredienteCategoria[22],
        code: ReceitaIngredienteCategoria[22],
      },
    ];
    this.unidadeDeMedida = [
      {
        id: ReceitaIngredienteUnidadeDeMedida["Colher de sopa"],
        name: ReceitaIngredienteUnidadeDeMedida[0],
        abbreviation: "colheres de sopa",
        code: ReceitaIngredienteUnidadeDeMedida[0],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida["Colher de chá"],
        name: ReceitaIngredienteUnidadeDeMedida[1],
        abbreviation: "colheres de chá",
        code: ReceitaIngredienteUnidadeDeMedida[1],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Gramas,
        name: ReceitaIngredienteUnidadeDeMedida[2],
        abbreviation: "g",
        code: ReceitaIngredienteUnidadeDeMedida[2],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Litros,
        name: ReceitaIngredienteUnidadeDeMedida[3],
        abbreviation: "l",
        code: ReceitaIngredienteUnidadeDeMedida[3],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Miligramas,
        name: ReceitaIngredienteUnidadeDeMedida[4],
        abbreviation: "mg",
        code: ReceitaIngredienteUnidadeDeMedida[4],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Mililitros,
        name: ReceitaIngredienteUnidadeDeMedida[5],
        abbreviation: "ml",
        code: ReceitaIngredienteUnidadeDeMedida[5],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida["Peças"],
        name: ReceitaIngredienteUnidadeDeMedida[6],
        abbreviation: "peças",
        code: ReceitaIngredienteUnidadeDeMedida[6],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Pitada,
        name: ReceitaIngredienteUnidadeDeMedida[7],
        abbreviation: "pitadas",
        code: ReceitaIngredienteUnidadeDeMedida[7],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Quilogramas,
        name: ReceitaIngredienteUnidadeDeMedida[8],
        abbreviation: "kg",
        code: ReceitaIngredienteUnidadeDeMedida[8],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida["Xícaras"],
        name: ReceitaIngredienteUnidadeDeMedida[9],
        abbreviation: "xícaras",
        code: ReceitaIngredienteUnidadeDeMedida[9],
      },
      {
        id: ReceitaIngredienteUnidadeDeMedida.Unidades,
        name: ReceitaIngredienteUnidadeDeMedida[10],
        abbreviation: "unidades",
        code: ReceitaIngredienteUnidadeDeMedida[10],
      },
    ];
  }

  getAllProducts(): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .get(`${this.url}/familyId/${this.familiaId}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductById(request: GetProdutoIdRequest): Observable<ProdutoResponse> {
    if (!this.authService.hasUsuario()) {
      return of({} as ProdutoResponse);
    }

    return this.http
      .get(`${this.url}/${request.id}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductsByName(
    request: GetProdutoNomeRequest
  ): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .post(`${this.url}/name/familyId/${this.familiaId}`, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  postProduct(request: ProdutoRequest): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .post(this.url, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  putProductById(request: ProdutoRequest): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .put(`${this.url}/${request.id}`, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  deletarProdutoById({ id }: DeletarProdutoRequest): Observable<any> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .delete(`${this.url}/${id}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  getTipoOptions(): IButtonSelect[] {
    return this.tipo;
  }

  getCategoriaOptions(): IButtonSelect[] {
    return this.categoria;
  }

  getCategoriaOptionById(id: number): IButtonSelect | undefined {
    return this.categoria.find((o) => o.id === id);
  }

  getUnidadeDeMedidaOptions() {
    return this.unidadeDeMedida;
  }
  getUnidadeDeMedidaOptionsByAbbr(
    abbr: string
  ): IButtonSelectComAbreviacao | undefined {
    return this.unidadeDeMedida.find((o) => o.abbreviation === abbr);
  }
}

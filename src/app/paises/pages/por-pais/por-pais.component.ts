import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPaisResponse } from '../../interfaces/pais.interface';
import { fieldsTable } from '../../utils/constantes';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  error: boolean = false;

  paises: IPaisResponse[] = [];
  paisesSugeridos: IPaisResponse[] = [];
  mostrarSugerencia: boolean = false;
  mostraRes: boolean = false;

  constructor(private paisSvc: PaisService) {}

  buscar(termino: string) {
    this.termino = termino;
    this.mostrarSugerencia = false;
    this.mostraRes = true;

    if (this.termino.slice().length !== 0) {
      this.paisSvc.buscarPais(this.termino, 'name', fieldsTable).subscribe({
        next: (res: IPaisResponse[]) => {
          this.paises = res;
          this.error = false;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.error = true;
            this.paises = [];
          }
        },
      });
    }
  }

  sugerencias(termino: string) {
    if(termino.trim().length === 0) return;
    this.mostraRes = false;
    this.error = false;
    this.mostrarSugerencia = true;
    this.termino = termino;

    this.paisSvc.buscarPais(termino, 'name', fieldsTable).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
      (err) => (this.paisesSugeridos = [])
    );
  }
}

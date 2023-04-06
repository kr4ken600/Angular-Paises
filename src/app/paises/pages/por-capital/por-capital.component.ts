import { Component } from '@angular/core';
import { IPaisResponse } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { HttpErrorResponse } from '@angular/common/http';
import { fieldsTable } from '../../utils/constantes';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = '';
  error: boolean = false;

  paises: IPaisResponse[] = [];

  constructor(private paisSvc: PaisService) {}

  buscar(termino: string) {
    this.termino = termino;

    if (this.termino.slice().length !== 0) {
      this.paisSvc.buscarPais(this.termino, 'capital', fieldsTable).subscribe({
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
    this.error = false;
    //TODO: Crear suegerencias
  }
}

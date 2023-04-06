import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPaisResponse } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent {
  termino: string = '';
  error: boolean = false;

  paises: IPaisResponse[] = [];

  constructor(private paisSvc: PaisService) {}

  buscar(termino: string) {
    this.termino = termino;
    
    if (this.termino.slice().length !== 0) {
      this.paisSvc.buscarPais(this.termino, 'name').subscribe({
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

  sugerencias(termino: string){
    this.error = false;
    //TODO: Crear suegerencias
  }
}

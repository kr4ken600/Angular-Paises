import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { IPaisResponse } from '../../interfaces/pais.interface';
import { fieldsTable } from '../../utils/constantes';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  regionActiva: string = '';

  paises: IPaisResponse[] = [];

  error: boolean = false;

  constructor(private paiseSvc: PaisService) {}

  getClass(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary mx-1'
      : 'btn btn-outline-primary mx-1';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;

    this.paiseSvc.buscarPais(region, 'region', fieldsTable).subscribe({
      next: (data: IPaisResponse[]) => {
        this.paises = data;
        this.error = false;
      },
      error: (err) => {
        this.error = true;
        this.paises = [];
      },
    });
  }
}

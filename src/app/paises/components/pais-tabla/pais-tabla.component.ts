import { Component, Input } from '@angular/core';
import { IPaisResponse } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent {

  @Input() paises: IPaisResponse[] = [];
  @Input() error: boolean = false;

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { IPaisResponse } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: IPaisResponse;

  constructor(
    private activatedR: ActivatedRoute,
    private paisesSvc: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedR.params
      .pipe(
        switchMap(({ id }) => this.paisesSvc.buscarPais(id, 'alpha')),
        tap(console.log)
      )
      .subscribe((res) => {
        this.pais = res[0];
      });
  }
}

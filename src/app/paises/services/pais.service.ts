import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaisResponse } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private urlBase: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  buscarPais(query: string, tipo: string): Observable<IPaisResponse[]> {
    const url = `${this.urlBase}/${tipo}/${query}`;

    return this.http.get<IPaisResponse[]>(url);
  }

}

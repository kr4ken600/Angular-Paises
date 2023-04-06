import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaisResponse } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private urlBase: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  buscarPais(query: string, tipo: string, fields: string[]): Observable<IPaisResponse[]> {
    const fieldsS = fields.join(',')
    const params = new HttpParams().set('fields', fieldsS);


    const url = `${this.urlBase}/${tipo}/${query}`;

    return this.http.get<IPaisResponse[]>(url, {params});
  }

}

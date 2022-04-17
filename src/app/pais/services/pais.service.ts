import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais-interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  // Url de la API
  private apiUrl: string = 'https://restcountries.com/v3.1/';

  // Parámetros de búsqueda.
  get httpParams () {
    return new HttpParams()
    .set( 'fields', 'name,capital,population,flags,cca2' );
  }

  constructor(private http: HttpClient) { }

  /*
    Función de extracción de datos por país.
  */
  buscarPais(termino: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );

  }

  /*
    Función de extracción de datos por capital.
  */
  buscarCapital( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );

  }

  /*
    Función de extracción de datos por id de país.
  */
  getPaisID( id: string ): Observable<Country> {

    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country>( url );

  }

  /*
    Función de extracción de datos por región.
  */
  buscarRegion( region: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url, { params: this.httpParams })
      .pipe(
        tap(console.log)
      );

  }

}

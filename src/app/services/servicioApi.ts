import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaPokemon, PokemonDetalle } from '../model/pokemon';
import { RespuestaTypes } from '../model/types';



@Injectable({
  providedIn: 'root',
})
export class servicioApi {

  private url = 'https://pokeapi.co/api/v2/pokemon/';
  private urlTypes = 'https://pokeapi.co/api/v2/type/';
  constructor(private servicioHttp: HttpClient) {}

  obtenerLista(): Observable<RespuestaPokemon> {
    return this.servicioHttp.get<RespuestaPokemon>(this.url);
  }
  obtenerDetalle(id: string): Observable<PokemonDetalle> {
    return this.servicioHttp.get<PokemonDetalle>(`${this.url}${id}/`);
  }
  obtenerTipo(): Observable <RespuestaTypes> {
    return this.servicioHttp.get<RespuestaTypes>(this.urlTypes);
  }
}
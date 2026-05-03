import { Component, OnInit } from '@angular/core';
import { servicioApi } from '../../services/servicioApi';
import { Pokemon, RespuestaPokemon } from '../../model/pokemon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado',
  imports: [RouterLink],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado implements OnInit {

  lista: Pokemon[] = [];

  constructor(private pokemonService: servicioApi) { }
  ngOnInit(): void {
    this.pokemonService.obtenerLista().subscribe({
      next: (res: RespuestaPokemon) => {
        this.lista = res.results;
      },
      error: (err) => {
        alert("Error, algo ha fallado en la conexión, no se ha podido obtener el dato");
        console.log("Fallo a la hora de obtener los datos de la Api", err)
      }
    });
  }
  extraerId(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 2];
  }
}
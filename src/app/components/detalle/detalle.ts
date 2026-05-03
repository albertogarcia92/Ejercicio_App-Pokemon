import { Component, OnInit } from '@angular/core';
import { PokemonDetalle, Sprites, Type } from '../../model/pokemon';
import { ActivatedRoute } from '@angular/router';
import { servicioApi } from '../../services/servicioApi';


@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})

export class Detalle implements OnInit {

  nombre?: string;
  tipo?: Type[];
  peso?: number;
  altura?: number;
  imagen?: Sprites;
  id?: string;
  pokemon?: PokemonDetalle[];

  constructor(private gestorRutas: ActivatedRoute, private pokemonService: servicioApi) {
  }

  ngOnInit(): void {
    this.gestorRutas.paramMap.subscribe((data) => {
      this.id = data.get('id') ?? undefined;

      if (this.id) {
        this.cargarDetalle(this.id);
      };
    });
  }

  cargarDetalle(id: string): void {
    this.pokemonService.obtenerDetalle(id).subscribe({
      next: (pokemon: PokemonDetalle) => {
        this.nombre = pokemon.name;
        this.id = pokemon.id;
        this.tipo = pokemon.types;
        this.altura = pokemon.height;
        this.peso = pokemon.weight;
        this.imagen = pokemon.sprites;
      },
      error: (err) => {
        alert("Error, algo ha fallado en la conexión, no se ha podido obtener el dato");
        console.log("Fallo a la hora de obtener los datos de la Api", err)
      }
    })
  }
}
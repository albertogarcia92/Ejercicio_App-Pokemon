import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Types } from '../../model/types';
import { servicioApi } from '../../services/servicioApi';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {

  tiposLista: Types[] = [];
  idFormulario = '';
  nombreFormulario = '';
  tipoFormulario = '-1';

  nombrePkEncontrado = signal<string | undefined>(undefined);
  idPkEncontrado = signal<string | undefined>(undefined);
  mensajeError = signal<string | undefined>(undefined);

  constructor(private pokemonService: servicioApi) {
    this.pokemonService.obtenerTipo().subscribe({
      next: (res) => {
        this.tiposLista = res.results;
      },
      error: () => {
        alert("Error, algo ha fallado en la conexión, no se ha podido obtener el dato");
      }
    });
  }
  ejecutarBusqueda(): void {
    this.nombrePkEncontrado.set(undefined);
    this.idPkEncontrado.set(undefined);
    this.mensajeError.set(undefined);

    let idNum = Number(this.idFormulario.trim());

    //Filtro de control para el ID requerido
    if (!this.idFormulario.trim()) {
      this.mensajeError.set('Error: El campo ID no puede estar vacío.');
      return;
    }
    //Filtro de control para el IDs distintos de 1 a 1025
    if (isNaN(idNum) || !Number.isInteger(idNum) || idNum < 1 || idNum > 1025) {
      this.mensajeError.set('Sin resultados: La Pokédex solo tiene registros desde el nº 1 hasta el nº 1025. ¡Ese ID todavía es un misterio!');
      return;
    }
    this.pokemonService.obtenerDetalle(this.idFormulario).subscribe({
      next: (pokemon) => {
        let coincidenFiltros = true;

        if (this.nombreFormulario.trim() !== '') {
          if (pokemon.name !== this.nombreFormulario.trim().toLowerCase()) {
            coincidenFiltros = false;
          }
        }
        if (this.tipoFormulario !== '-1') {
          const coincidenTipos = pokemon.types.some(t => t.type.name === this.tipoFormulario);
          if (!coincidenTipos) {
            coincidenFiltros = false;
          }
        }
        if (coincidenFiltros) {
          this.nombrePkEncontrado.set(pokemon.name);
          this.idPkEncontrado.set(pokemon.id);
        } else {
          this.mensajeError.set('Sin resultados: Con los parámetros introducidos, la Pokédex no es capaz de encontrar el Pokémon que buscas.');
        }
      },
      error: (err) => {
        alert("Error, algo ha fallado en la conexión, no se ha podido obtener el dato");
        console.log("Fallo a la hora de obtener los datos de la Api", err)
      }
    });
  }
}
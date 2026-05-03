import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error implements OnInit {

  ngOnInit(): void {
    this.Error404();
  }

  Error404() {
    Swal.fire({
      icon: "error",
      title: "No encontrada (404)",
      text: "¡La página que buscas no existe!",
      footer: '<a href="/home">¿Quieres volver a Home?</a>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false
    });
  }
}

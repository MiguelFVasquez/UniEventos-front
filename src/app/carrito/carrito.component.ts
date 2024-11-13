import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';
import { CarritoEventoComponent } from '../carrito-evento/carrito-evento.component';
import { SharedService } from '../servicios/shared-service.service';
import { ItemCarritoDTO } from '../models/item-carritoDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterModule, CarritoEventoComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  elementosCarritos: ItemCarritoDTO[] = [];
  idUsuario: string = '';
  cuponForm!: FormGroup;
  cantidadEventos: number = 0;

  constructor(
    private carritoService: CarritoService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {
    // Obtener el ID de usuario desde el servicio compartido
    this.idUsuario = this.sharedService.getUserId();
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.listarElementosCarrito();
    this.actualizarCantidadEventos();
  }

  // Método para listar los elementos del carrito
  public listarElementosCarrito(): void {
    this.carritoService.listarElementos(this.idUsuario).subscribe({
      next: (data) => {
        if (!data.error) {
          this.elementosCarritos = data.respuesta;
          this.cantidadEventos= data.respuesta.length;
          console.log("Elementos del carrito: " + data.respuesta)
        } else {
          console.error("Error al obtener los elementos del carrito");
        }
      },
      error: (err) => {
        console.error("Error en la solicitud al backend:", err);
      }
    });
  }

  // Actualiza el total de eventos en el carrito
  actualizarCantidadEventos(): void {
    this.cantidadEventos = this.obtenerCantidadEventos();
  }

  // Retorna la cantidad de eventos en el carrito
  obtenerCantidadEventos(): number {
    return this.elementosCarritos.length;
  }

  // Crea el formulario para aplicar un cupón
  public crearFormulario(): void {
    this.cuponForm = this.formBuilder.group({
      codigoCupon: ['', [Validators.maxLength(6), Validators.minLength(6)]]
    });
  }
}

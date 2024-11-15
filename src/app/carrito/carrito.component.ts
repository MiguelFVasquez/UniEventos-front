import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';
import { CarritoEventoComponent } from '../carrito-evento/carrito-evento.component';
import { SharedService } from '../servicios/shared-service.service';
import { ItemCarritoDTO } from '../models/item-carritoDTO';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RedimirCuponDTO } from '../models/RedimirCuponDTO';
import { CuponService } from '../servicios/cupon.service';

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
  idCarrito: string = '';
  cuponForm!: FormGroup;
  cantidadEventos: number = 0;
  totalCarrito: number= 0;

  cuponRedimido: boolean =false;
  constructor(
    private carritoService: CarritoService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cuponService: CuponService
  ) {
    // Obtener el ID de usuario desde el servicio compartido
    this.idUsuario = this.sharedService.getUserId();
    this.idUsuario= localStorage.getItem('idUser') || '';
    this.idCarrito= this.sharedService.getCarritoId();
    this.idCarrito=localStorage.getItem('idCarrito') || '';
    this.crearFormulario();
    this.obtenerTotalCarrito();
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarElementosCarrito();
    this.actualizarCantidadEventos();
  }

  // Método para listar los elementos del carrito
  public listarElementosCarrito(): void {
    console.log("Id al listar Elementos: ", this.idUsuario);
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

  obtenerTotalCarrito(): void{
      this.carritoService.obtenerTotalCarrito(this.idCarrito).subscribe({
        next: (data) => { 
          this.totalCarrito= data.respuesta;
        }
      })
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
      codigoCupon: ['', [Validators.maxLength(8), Validators.minLength(4)]]
    });
  } 

  redimirCupon(): void {
    if (this.cuponForm.valid) {
      const codigoCupon = this.cuponForm.get('codigoCupon')?.value;  // Captura el valor del código de cupón
  
      const redimirCuponDTO = {
        idCuenta: this.idUsuario,
        codigoCupon,
        total: this.totalCarrito
      };
  
      this.cuponService.redimirCupon(redimirCuponDTO).subscribe({
        next: (response) => {
          if (response.error) {
            this.showNotification('Error al redimir el cupón: ' + response.respuesta);
          } else {
            // Actualiza el total del carrito con el descuento aplicado
            this.totalCarrito = response.respuesta;
            this.showNotification('Cupón redimido con éxito. Nuevo total: $' + this.totalCarrito);
            this.cuponRedimido = true;
          }
        },
        error: (err) => {
          console.error('Error al redimir el cupón:', err);
          this.showNotification('Ocurrió un problema al procesar tu solicitud.');
        },
      });
    } else {
      this.showNotification('Por favor, ingresa un valor de cupón válido.');
    }
  }
  
  
  
  finalizarCompra() {
    // Lógica para finalizar la compra
    console.log('Compra finalizada');
  }
  obtenerTotalDescuento(){
    this.carritoService.obtenerTotalDescuento(this.idCarrito).subscribe({
      next: (data) => { 
        this.totalCarrito= data.respuesta;
      }
    });
  }
  public showNotification(message: string, action: string = 'Cerrar') {
    Swal.fire({
      title: message,
      confirmButtonText: action,
      icon: 'info',
      position: 'top',
      timer: 3000, // Duración en milisegundos
      timerProgressBar: true,
      showCloseButton: true,
      toast: true,
      customClass: {
        popup: 'custom-swal-popup' // Clase CSS personalizada
      }
    });
  }
  
  
}

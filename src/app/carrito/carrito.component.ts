import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';
import { CarritoEventoComponent } from '../carrito-evento/carrito-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators  } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterModule, CarritoEventoComponent, ReactiveFormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  elementosCarritos:any[] = [];

  cuponForm!: FormGroup;

  listaCarrito=[];

  cantidadEventos: number = 0;

  idEvento: string= "";
  idCarrito: string= "";
  nuevaCantidad: number= 0;
  nLocalidad: string="";

   carritoDTO: CarritoDTO ={
      idEvento: this.idEvento,
      idCarrito: this.idCarrito,
      nuevaCantidad: this.nuevaCantidad,
      nLocalidad: this.nLocalidad
  };

  constructor(private carritoService:CarritoService, private formBuilder: FormBuilder){
    this.listaCarrito;
    this.carritoDTO;
    this.actualizarCantidadEventos();
    this.crearFormulario();
  }
  public listarElementosCarrito(){
    this.carritoService.listarElementos(this.carritoDTO).subscribe({
      next: (data) => {
        this.elementosCarritos = data.respuesta;
      }
    });
  }

  actualizarCantidadEventos() {
    this.cantidadEventos = this.obtenerCantidadEventos();
  }

  obtenerCantidadEventos(): number {
    return 4; 
  }

  public crearFormulario() {
    this.cuponForm = this.formBuilder.group({
      codigoCupon: ['', [Validators.maxLength(6),Validators.minLength(6)]]
    });
   }
   

}

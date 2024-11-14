import { Component, Input } from '@angular/core';
import { ItemEventoDTO } from '../models/item-evento-dto';
import { ItemCarritoDTO } from '../models/item-carritoDTO';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';
import { SharedService } from '../servicios/shared-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './carrito-evento.component.html',
  styleUrl: './carrito-evento.component.css'
})
export class CarritoEventoComponent {

  @Input() itemCarrito!: ItemCarritoDTO;

  idEvento: string="";
  idCarrito: string="";
  cantidad: number=0;

  nCantidad: number=0;

  editarForm!: FormGroup;

  constructor(private carritoService : CarritoService,
              private sharedService: SharedService,
              private formBuilder: FormBuilder
  ){
    this.idCarrito= this.sharedService.getCarritoId();
  }

  eliminarEvento(idEvento: string){
    const carritoDTO: CarritoDTO = {
      idCarrito:this.idCarrito,
      idEvento: idEvento,
      nuevaCantidad: this.itemCarrito.nuevaCantidad,
      nLocalidad:this.itemCarrito.nLocalidad
    };

    this.carritoService.eliminarElemento(carritoDTO).subscribe({
      next: (data) => {
        data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarCantidad(idEvento: string):void{
    const carritoDTO: CarritoDTO = {
      idCarrito:this.idCarrito,
      idEvento: idEvento,
      nuevaCantidad: this.nCantidad,
      nLocalidad:this.itemCarrito.nLocalidad
    };
    this.carritoService.editarCantidad(carritoDTO).subscribe({
      next: (data) => {
        data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public crearFormulario(){
    this.editarForm = this.formBuilder.group({
      nCantidad: this.cantidad
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
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
export class CarritoEventoComponent implements OnInit {

  @Input() itemCarrito!: ItemCarritoDTO;

  idEvento: string="";
  idCarrito: string="";
  nCantidad: number=0;
  editarForm!: FormGroup;

  constructor(private carritoService : CarritoService,
              private sharedService: SharedService,
              private formBuilder: FormBuilder
  ){
    this.idCarrito= this.sharedService.getCarritoId();
    this.crearFormulario();
  }
  ngOnInit(): void {
    if(this.itemCarrito != null){
      this.editarForm.patchValue({
        nCantidad: this.itemCarrito.nuevaCantidad,
      });
    }
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
      nuevaCantidad: this.editarForm.get("nCantidad")?.value,
      nLocalidad:this.itemCarrito.nLocalidad
    };

    console.log("Nueva cantidad: ", carritoDTO.nuevaCantidad)
    this.carritoService.editarCantidad(carritoDTO).subscribe({
      next: (data) => {
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public crearFormulario(){
    this.editarForm = this.formBuilder.group({
      nCantidad: 0
    });
  }

}

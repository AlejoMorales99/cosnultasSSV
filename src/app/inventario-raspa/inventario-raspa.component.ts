import { Component, OnInit } from '@angular/core';
import { InventarioRaspaService } from './inventario-raspa.service';
//Se importan las ayudas para el manejo del formulario
import { FormBuilder } from '@angular/forms';
import { ValidacionesCedulaService } from '../validaciones-cedula.service';

@Component({
  selector: 'app-inventario-raspa',
  templateUrl: './inventario-raspa.component.html',
  styleUrls: ['./inventario-raspa.component.css']
})
export class InventarioRaspaComponent implements OnInit {
  aumentar: any;

  constructor(private raspas:InventarioRaspaService, private fb: FormBuilder, private vali:ValidacionesCedulaService ) { }

  ngOnInit(): void {
    this.myForm = this.vali.validarCedula();
  }

  //se inicializan las variables
  cargando: boolean = false;
  ocultarTexto:boolean = false;
  myForm: any;
  validacionRed: boolean = true;
  condicion: string = "";
  inventarioRaspas: any[] = [];
  cedulaInventario: string = "";
  page: number = 1;

  onSubmit(cedulas:string) {

    if (this.myForm.valid) {

      this.cargando = true;
      
      this.raspas.cargarRaspas(cedulas).subscribe(raspas => {

        for (let i = 0; i <Object.values(raspas).length; i++) {
          setTimeout(() => {          
            this.aumentar += this.aumentar + i;
          }, )
          
          
        }

        this.inventarioRaspas = Object.values(raspas);

        console.log(this.inventarioRaspas);
        
        if (this.inventarioRaspas.length==0) {
          this.condicion = "no existen registros con ese numero de cedula";
          this.validacionRed = false;
          this.cedulaInventario = "";
          this.cargando = false;
          this.ocultarTexto = false;
        } else {
          this.cedulaInventario = cedulas;
          this.cargando = false;
          this.ocultarTexto = true;
        }
        
      });
      
    } else {
      this.condicion = "Por favor digite su cedula";
      this.validacionRed = false;
    }
  }

  quitarMensajesError(cedula:string) {
    if (cedula.length == 0) {
      this.page = 0;
      this.inventarioRaspas = [];
      this.cedulaInventario = "";
      this.ocultarTexto = false;
    }
  }

  limpiar(cedula:string) {
    this.condicion = "";
    this.validacionRed = true;
  }
  

}

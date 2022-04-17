import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = "";
  paises: Country[] = [];
  error: boolean = false;

  constructor( private paisServicio: PaisService ) { }

  ngOnInit(): void {
  }

  /*
    Función para determinar clases de CSS cuando se cumple una condición
  */
  getClassCSS( region: string ): string{
    return (
      region === this.regionActiva ? 'btn btn-primary': 'btn btn-outline-primary'
    );
  }

  /*
    Función para equiparar la región que he seleccionado con la que se muestra en el titulo.
  */
  activarRegion(region: string){

    if(region === this.regionActiva){
      return;
    }

    this.paises = [];
    this.regionActiva = region;

    /*
      Consumimos la API a través del método de buscarRegion() para recoger los datos
      de cada región.
    */
    this.paisServicio.buscarRegion( this.regionActiva )
      .subscribe( (paises) => {
        this.paises = paises;
      });

  }

}

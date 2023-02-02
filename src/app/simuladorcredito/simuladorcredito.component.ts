import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Workbook } from 'exceljs';
import { CalulartasaService } from '../services/credito/calulartasa.service';
import { FechasiguienteService } from '../services/credito/fechasiguiente.service';
import { ReagustrarcuotafijaService } from '../services/credito/reagustrarcuotafija.service';

import * as fs from 'file-saver';


@Component({
  selector: 'app-simuladorcredito',
  templateUrl: './simuladorcredito.component.html',
  styleUrls: ['./simuladorcredito.component.css']
})
export class SimuladorcreditoComponent implements OnInit {
  public frmCredito:any = FormGroup;
  public lstDetalleCredito:any=[];
  public fechaStrActual: any = String;
  public fechaActual :any = Date ;
  public sumaAmortiacion:any= Number;
  public sumaInteres:any= Number;
  public  valorTeaTem:any = Number;

  private _workBook! : Workbook;


  constructor(
    private fb :FormBuilder,
    private pd:DatePipe,
    private decimalPipe: DecimalPipe,  
    private convertirtasa : CalulartasaService,
    private cuotaFija: ReagustrarcuotafijaService,
    private fechapagoService: FechasiguienteService
  
  ) { }

  ngOnInit(): void {
    this.frmCredito = this.initfrmCredito()
  }

  public initfrmCredito(){   
    return this.fb.group({
      monto: [null],
      fecha:[null],
      tea: [null],
      nroCuotas:[null],
    })

  }

mostrarTasa(event:any){
  let tem = this.convertirtasa.convertirtasa(event.value,'TeaTem')
  this.valorTeaTem =  Number(this.decimalPipe.transform((tem * 100), '0.2-2'));
}


public simularCredito(){
   // Obtener Datos
   this.lstDetalleCredito = [];

   let credito = {
    monto :this.frmCredito.value.monto,
    fecha :this.frmCredito.value.fecha,
    tea : this.frmCredito.value.tea,
    nroCuotas : this.frmCredito.value.nroCuotas
  }

  if ( ! this.datosrequeridos(credito) ) return;
  
  var diafijo = this.frmCredito.value.fecha.split('-')
  var fecha = this.frmCredito.value.fecha
  var Tea = this.frmCredito.value.tea
  var montoCredito = this.frmCredito.value.monto
  var nroCuotas = this.frmCredito.value.nroCuotas
  var tem = this.convertirtasa.convertirtasa(Tea,'TeaTem')
  //alert(tem)
  var cuotaFija:number   =   this.cuotaFija.reduceCuota(montoCredito, nroCuotas,tem,fecha);
  //alert('cuotaFija:' +cuotaFija)
  var saldoCapital = montoCredito;

  var sumaAmortizacion = 0.000
  var sumaInteres = 0.000
  for (let i = 1; i <=  nroCuotas; i++) {
    
    let fechaCuota = this.fechapagoService.nuevaFecha(fecha,diafijo[2])

    var fechaInicio = new Date(fecha).getTime();
    var fechaFin    = new Date(fechaCuota).getTime();
    
    var diff = fechaFin - fechaInicio;
    var diffDias = diff/(1000*60*60*24) 

    var valTed = this.convertirtasa.convertirtasa(tem * 100,'TemTed')     
        valTed = valTed + 1;
    var ValorPotencia = Math.pow(valTed, diffDias);
    ValorPotencia =  Number(this.decimalPipe.transform(ValorPotencia, '0.0-6'));

    var valorInteres = (saldoCapital * ValorPotencia) - saldoCapital;

    //var seguroDesgra = MetSeguroDesgra.ValorSeguro(saldoCapital, diferenciaDias);
   var amortizacion = cuotaFija - valorInteres;
          
    //console.log(tem)
    //let ted = this.servicioCredito.convertirtasa(Tea,'TeaTem')

    var detalleCredito ={
        nroCuota : i,
        nroDias :diffDias,
        fechaPago:fechaCuota,
        saldoCapital : saldoCapital,
        amortizacion:amortizacion,  
        interes:valorInteres,       
        cuotafija:cuotaFija
    }

    this.lstDetalleCredito.push(detalleCredito);

    fecha = fechaCuota;
    saldoCapital = saldoCapital - amortizacion;
    sumaAmortizacion = sumaAmortizacion +amortizacion
    this.sumaAmortiacion = sumaAmortizacion
    sumaInteres = sumaInteres+valorInteres
    this.sumaInteres = sumaInteres
  };

}

public datosrequeridos(credito: any){

  //alert(  parseFloat(credito.monto))

  if (parseFloat(credito.monto) < 1000 && parseFloat(credito.monto) > 100000001)
  {
    alert("El rango del monto es 500.00 y 1000,000,000.00")
    return false 
  }
  if (parseFloat(credito.tea) < 10.00 && parseFloat(credito.tea) > 99.00)
  {
    alert("El rango de las tasa es : 10.00 y 99.00")
    return false 
  }
  if ( parseFloat(credito.nroCuotas) < 1000 && parseFloat(credito.nroCuotas) > 100000001)
  {
    alert("El rango de cuotas es  2 y 120")
    return false 
  }
 
  return true;

}

public exportarExcel(){
alert(JSON.stringify(this.lstDetalleCredito))

 this._workBook  = new Workbook();

 this._workBook.creator="Digidev";
 this._workBook.addWorksheet('hoja01')
 this._workBook.xlsx.writeBuffer().then((data)=>{

  const blob = new Blob([data])

  fs.saveAs(blob,"Ejmplo.xlsx");

 })

this.lstDetalleCredito.forEach((dataDetalle: any) => {
  alert(JSON.stringify(dataDetalle))
})

}

public  crearPDF(){
 alert('pdf')
}


}

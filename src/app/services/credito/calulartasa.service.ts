import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalulartasaService {

  constructor(
    private decimalPipe:DecimalPipe
  ) { }
  convertirtasa(valorTasa:number, tipo:string ):number{
    var tasa = valorTasa;
    var anioMes:number;
    var mesDia : number;
    var valorTea:number;
    var valorTem:number
    var resulatado:number;
      
     if (tipo == 'TeaTem'){
         tasa        =   (tasa / 100);
         anioMes     =   (1.0 / 12);
         valorTea    =   tasa +1 ;
         resulatado  =   Math.pow(valorTea, anioMes);
         //resulatado  =   Math.round(resulatado-1);
         resulatado = Number(this.decimalPipe.transform((resulatado-1), '0.0-9')); 
         //console.log('2 ok:'+resulatado)
       return resulatado ;      
     }
     else if (tipo == 'TemTed'){
      
      tasa         = (tasa / 100);
      mesDia      = (1.0 / 30);
      valorTem = (1 + tasa);           
      resulatado = Math.pow(valorTem, mesDia);
      
      resulatado = Number(this.decimalPipe.transform((resulatado-1), '0.0-9'));
      return resulatado;
      
     }
     else if (tipo == 'TeaTed'){
 
      return 0.0
     }
 
     return 0.00;
   }
  
}

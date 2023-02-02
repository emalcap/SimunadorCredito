import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasiguienteService {

  constructor() { }

  public nuevaFecha( fecha:String,diaFijo:string){ 
    // const no modificada 
    //console.log(typeof fecha);    
    var oldFecha   = fecha.split('-');   
    var anio  = parseInt(oldFecha[0])
    var mes = parseInt(oldFecha[1])
    var dia  = parseInt(diaFijo)
    
    mes = mes + 1;        

    if(mes == 13) {
       mes = 1;
       anio = anio + 1;
      
    }

   var anoBisiesto = anio % 4;

    if (mes == 2 && dia > 28 )
    {
      dia = 28;

        if (anoBisiesto == 0){
          dia = 29;
        }                
    }
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30)
    {
      dia = 30;
    }
         
    var anioStr  = anio.toString()  
    var mesStr  = mes.toString() 
    var diaStr   = dia.toString() 
    
    if (mesStr.length ==1) mesStr = '0'+mesStr
    if (diaStr.length ==1) diaStr = '0'+diaStr
    
    return anioStr+'-'+mesStr+'-'+diaStr;
      
    
  }
}

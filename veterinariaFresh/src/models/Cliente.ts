import {GeneradorId} from "./GeneradorID"
import {Mascota} from "./Mascota"

export class Cliente {
    protected id:string;
    protected nombre:string;
    protected telefono:number;
    protected visitas:number;
    protected esVip:string;
    protected mascotas:Mascota[]

    constructor(nombre:string,telefono:number) {
        this.id= GeneradorID.instancia.generarID();
        this.nombre=nombre;
        this.telefono=telefono;
        this.visitas=0;
        this.esVip="No";
        this.mascotas=[];
    }

    agregarVisita():void{
     this.visitas=this.visitas+1
     if (this.visitas>=5){
        this.esVip="Si"
     }
    }

    agregarMascota(mascota:string):void{
        this.mascotas.push(mascota)
    }

    bajaMascota(nombre:string):void{
        this.mascotas=this.mascotas.filter(mascota => mascota !=nombre)
    }

    modificarCliente(propiedadAModificar:string,valorNuevo:any){
        if (propiedadAModificar=="nombre"){
            this.nombre=valorNuevo
        }else {
            this.telefono=valorNuevo
        }
    }


}
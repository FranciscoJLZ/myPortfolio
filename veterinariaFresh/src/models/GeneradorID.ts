/**
 * Clase GeneradorID.
 * En esta clase me parecio apropiado aplicar el patron "Singleton"
 * https://refactoring.guru/design-patterns/singleton/typescript/example
 * ya que los ids van a ser globales para todo el sistema y se necesita
 * un unico lugar donde almacenar todas las id generadas con el fin
 * de chequear que sean unicas.
 */
export class GeneradorID {
  private static _instancia: GeneradorID;

  private ids: string[];

  private constructor() {
    this.ids = [];
  }

  /**
   * Se crea un metodo getter para exponer
   * publicamente la instancia de la clase.
   * Si aun no se ha instanciado, se instancia sola y devuelve la instancia,
   * si no, devuelve la instancia ya creada.
   */
  public static get instancia(): GeneradorID {
    if (!this._instancia) {
      GeneradorID._instancia = new GeneradorID();
    }
    return this._instancia;
  }

  /**
   * Metodo privado para generar
   * las cadenas aleatorias.
   */
  private generarAleatorio(): string {
    const parteTiempo = Date.now().toString(36).padStart(10, "x");
    const parteAleatoria = () =>
      Math.floor(Math.random() * 1e12)
        .toString(36)
        .padStart(10, Math.floor(Math.random() * 1e12).toString());
    return `${parteAleatoria()}-${parteTiempo}-${parteAleatoria()}`;
  }

  /**
   * Metodo privado para chequear
   * si una cadena de texto tiene
   * un formato de ID valido
   */
  private validarFormato(cadena: string) {
    const formato = /^[a-z0-9]{10}-[a-z0-9]{10}-[a-z0-9]{10}$/;
    return formato.test(cadena);
  }

  /**
   * Metodo público para solicitar la creacion
   * de una ID unica y no repetida
   */
  public generarID(): string {
    // Genero un ID
    let id = this.generarAleatorio();
    // Si el ID ya fue generado,
    while (this.ids.includes(id)) {
      // genero otro hasta que no se repita
      id = this.generarAleatorio();
    }
    // Guardo el nuevo ID
    this.ids.push(id);
    return id;
  }

  /**
   * Metodo público para reciclar ids.
   * Este metodo deberia usarse cada vez que se elimina
   * una instancia de alguna clase que utilice estos ids.
   */
  public removeID(id: string) {
    // Chequear si id es del mismo tipo
    if (!this.validarFormato(id)) {
      throw new Error("El ID ingresado no es válido.");
    }
    // Chequear si ID existe en this.ids
    if (!this.ids.includes(id)) {
      throw new Error("El ID ingresado no existe.");
    }

    // Eliminar ID del arreglo de ids.
    this.ids = this.ids.filter((i) => i === id);
  }
}

/**
 * EJEMPLO DE USO: GeneradorID
 * En este ejemplo se crea una clase ejemplo: Perro
 * a la cual en su constructor se inicia la propiedad id
 * utilizando la clase GeneradorID de manera
 */

// import { GeneradorID } from "../<path>/GeneradorID"

class Perro {
  private id: string;
  private nombre: string;

  constructor(nombre: string) {
    /**
     * Aqui se llama al metodo público de la clase GeneradorID
     * y se guarda el resultado en la propiedad id de Perro.
     */
    this.id = GeneradorID.instancia.generarID();
    this.nombre = nombre;
  }

  public getID(): string {
    return this.id;
  }
}

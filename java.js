const mediosDePagoMexico = [
  "Visa",
  "Mastercard",
  "American Express",
  "BBVA",
  "Citibanamex",
  "HSBC",
  "Santander",
  "Banorte",
  "IXE",
  "Oxxo",
];

const mediosDePagoArgentina = [
  "Visa",
  "Mastercard",
  "American Express",
  "Cabal",
  "Nativa",
  "Naranja",
  "Mercado Pago",
  "cordobesa",
  "Diners Club",
  "CMR",
  "Tarjeta Walmart",
  "Tarjeta Shopping",
  "Maestro",
  "Rapipago",
  "Provincia Net",
  "Link",
  "Pago Facil",
];

const mediosDePagoUruguay = [
  "Visa",
  "Mastercard",
  "OCA",
  "Diners Club",
  "Abitab",
  "Red Pagos",
];

class Propuesta {
  constructor(nombre, pais, nombreProducto, precioProducto) {
    this.nombreEmpresa = nombre;
    this.pais = pais;
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.comision = 0;
    this.mediosDePago = [];
  }

  calcularComision() {
    switch (this.pais.toUpperCase()) {
      case "MEXICO":
        this.comision = 0.0349 * this.precioProducto;
        this.mediosDePago = mediosDePagoMexico;
        break;
      case "ARGENTINA":
        this.comision = 0.0599 * this.precioProducto;
        this.mediosDePago = mediosDePagoArgentina;
        break;
      case "URUGUAY":
        this.comision = 0.0649 * this.precioProducto;
        this.mediosDePago = mediosDePagoUruguay;
        break;
    }
  }
  toString() {
    return (
      "Nombre de empresa: " +
      this.nombreEmpresa +
      "\nPais: " +
      this.pais +
      "\nNombre de producto: " +
      this.nombreProducto +
      "\nPrecio de producto: $" +
      this.precioProducto +
      "\nComision a cobrar: $" +
      this.comision +
      "." +
      "\nLos medios de pago disponibles son: " +
      this.mediosDePago.toString()
    );
  }
}
///Reemplazamos el boton por formulario y las alerts por inputs y eventos
function comenzarSimulador() {
  document
    .getElementsByClassName("jumbotron")[0]
    .removeChild(document.getElementsByClassName("btn btn-primary btn-lg")[0]);
  let formulario = document.createElement("div");
  formulario.className = "contenedorFormulario";
  formulario.innerHTML = `
  <form id='formularioCalculadora'>
        <span>Nombre de empresa</span>
        <input type='text' /> <br />
        <span>Pais</span> 
        <input type="text" list="listaPaises">
        <datalist id="listaPaises">
          <option value="Argentina">  
          <option value="Mexico">
          <option value="Uruguay">
        </datalist>
         <br />
        <span>Nombre del producto</span>
        <input type='text' /> <br />
        <span>Precio del producto</span>
        <input type='number' /><br />
        <a
          class="btn btn-primary btn-lg"
          href="#"
          role="button"
          
          > Calcular</a
        >
      </form> `;
  document.getElementsByClassName("jumbotron")[0].appendChild(formulario);
  let boton = document.getElementsByClassName("btn btn-primary btn-lg")[0];
  boton.addEventListener("click", ejecutarSimulador);
}
function cargarDatos() {
  const formulario = document.getElementById("formularioCalculadora");

  return new Propuesta(
    formulario.children[1].value,
    formulario.children[4].value,
    formulario.children[8].value,
    formulario.children[11].value
  );
}

function ejecutarSimulador() {
  const propuestaDeNegocios = cargarDatos();
  propuestaDeNegocios.calcularComision();
  document
    .getElementsByClassName("jumbotron")[0]
    .removeChild(document.getElementsByClassName("contenedorFormulario")[0]);
  let resultado = document.createElement("div");
  //Definimos el innerHTML del elemento con una plantilla de texto que va a agregar el div con todo el contenido
  resultado.innerHTML = `
<p>Nombre Empresa: ${propuestaDeNegocios.nombreEmpresa}  </p> 
<p>Pais:  ${propuestaDeNegocios.pais} </p> 
<p>Producto: ${propuestaDeNegocios.nombreProducto}  </p>
<p>Precio del producto:  $${propuestaDeNegocios.precioProducto}  </p>  
<p>Comision:  $${propuestaDeNegocios.comision} </p> 
<p>Medios de pago:  ${propuestaDeNegocios.mediosDePago.toString()} </p> 

`;
  resultado.className = "resultado";

  //Agregamos el contenedor creado al body
  document.getElementsByClassName("jumbotron")[0].appendChild(resultado);
}

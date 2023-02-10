const fs = require("fs");
const { json } = require("stream/consumers");


//creamos la clase//
class ProductManager {
  #path = "./productos.json";

  constructor(path){
 this.#path = path
  }

// METODO PARA CREAR PRODUCTO//
  async addProduct(id,title, description, price, thumbnail,code,stock) {
    const newProduct = {
      id: id.length,
        title : title,
        description: description,
         price : price,
         thumbnail :  thumbnail,
        code:code,
         stock :stock
    };



// consultar los producto
    const products = await this.getProducts();
// desestructuro y agrego el nuevo producto
    const updateProducts = [...products, newProduct];
// escribo los usuarios actualizados
    await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
  }


// ----------------------METODO GETPRODUCT ---------------------------
  async getProducts() {

    try {
      const products =  await fs.promises.readFile(this.#path,"utf-8");
// paso los usuarios en objetos
      return JSON.parse(products);
    } catch (e) {
      
      return []
    }
  }

//-------------------METODO GETPRODUCTBYID-----------------------------------
async getProductById(id) {        // Producto por ID
  const prod = await this.getProducts();
  let productget = prod.find((x) => x.id === id);
  if (productget) {
    await fs.promises.readFile(this.#path,"utf-8");
      return console.log(productget);
  } else {
      throw new Error(`no se encuentra id`);
  }
}

//---------------------------METODO DELETEPRODUCT--------------------------------------

async deleteProduct(id) {        // Elimina producto por ID lo filtro y me devuelve la actualizacion con un nuevo json
  const producto = await this.getProducts();
  let deleteProduct = producto.find((x) => x.id === id);
  if (deleteProduct) {
    let resto = producto.filter((x) => x.id !== id);
    fs.promises.appendFile("./actualizacion.json",`actualizacion:  ${JSON.stringify(resto)}`);
  } else {
    throw new Error(` no hay producto con el : ${id}`);
  }
}





//-----------------------------METODO UPDATEPPRODUCT------------------------------
// 2 parametros para actualizar
async updateProducts (id,title,description,price,thumbnail,code,stock){

// creo un array vacio donde voy a meter los productos actualizados

let newArray = []
// llamo a la funcion getproduct y lo guardo la constante producto
const producto = await this.getProducts();
// en el nuevo array guardo la busqueda por id
newArray = producto.find((p)=>p.id===id);
//validacion si no esta definido , que sea producto.title
if (title === undefined) {
  title = producto.title;
  //sino que sea newarray.title
} else {
  newArray.title = title;
}
if (description === undefined) {
  title = producto.description;
} else {
  newArray.description = description;
}
if (price === undefined || price !== Number) {
  price = producto.price;
} else {
  newArray.price = price;
}
if (thumbnail === undefined) {
  thumbnail = producto.thumbnail;
} else {
  newArray.thumbnail = thumbnail;
}
if (code === undefined) {
  code = producto.code;
} else {
  newArray.code = code;
}
if (stock === undefined || stock !== Number) {
  stock = producto.stock;
} else {
  newArray.stock = stock;
}

fs.promises.appendFile("./productos.json",`los productos actualizados  ${JSON.stringify(producto)}`)
}
}


// ---------------------------------OPERACIONES DEL MANAGER--------------------------------------
async function main() {
  const manager = new ProductManager("./productos.json");
//---------------------GENERA LOS PRODUCTOS-------------
  console.log(await manager.getProducts());

  await manager.addProduct(
    "manzana",
    "naranja",
    30,
    5,
    34,
    2
  );

  await manager.addProduct(
    "frutilla",
    "melon",
    45,
    5,
    7,
    9
  );


 
//-----------------OBTENER EL PRODUCTO POR ID----------------------

//await manager.getProductById(7)
  //-------------------BORRA EL PRODUCTO COLOCANDO EL ID----------------
 //console.log(await manager.deleteProduct(8))
 
 //---------------AGREGAR INFORMACION------------------
 //console.log(await manager.updateProducts(7,"prueba","prueba"))


}

main();
console.log(main)
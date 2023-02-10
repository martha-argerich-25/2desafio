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
  let deleteProduct = producto.find((p) => p.id === id);
  if (deleteProduct) {
    let resto = producto.filter((p) => p.id !== id);
    fs.promises.appendFile("./listaActualizada.json",JSON.stringify(resto))
  } else {
    throw new Error(` no hay producto con el : ${id}`);
  }
}





//-----------------------------METODO UPDATEPPRODUCT------------------------------

async updateProducts (id,data){
  
  const producto = await this.getProducts();
  // el metodo recorre el array y si ve algo lo cambia y sino te devuelve el objeto 
  const updatedProducts = producto.map((p)=>{
    if(p.id === id){
      return{
        ...p,
        data,
        id,
      };
       
    }
   return p;
  })
  
  await fs.promises.writeFile(this.#path,JSON.stringify(updatedProducts));
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

await manager.getProductById(7)

  //-------------------BORRA EL PRODUCTO COLOCANDO EL ID- y crea una actualizacion---------------

 console.log(await manager.deleteProduct(8))
 
 //---------------AGREGAR INFORMACION------------------

 console.log(await manager.updateProducts(7,"prueba",))


}

main();
console.log(main)
const fs = require("fs");


//creamos la clase//
class ProductManager {
  #path = "./productos.json";


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


// METODO GETPRODUCT ( escribe ARCHIVO y lo parcea)FUNCIONA
  async getProducts() {

    try {
      const products = await fs.promises.writeFile(this.#path, "utf-8");
// paso los usuarios en objetos
      return JSON.parse(products);
    } catch (e) {
      return []
    }
  }

//METODO GETPRODUCTBYID//
async getProductById (id){

  
const searchId = products.find((pr)=>pr.id === id)
if(searchId ){
  //lee
  await fs.promises.readFile(this.#path, "utf-8");
  //escribre
  await fs.promises.writeFile(this.#path, "utf-8");
  //lo tranforma en objeto
  return JSON.parse(products);


}
}

//METODO UPDATEPRODUCT



//METODO DELETEPRODUCT

async deleteProduct(id){
  const deleteID =  product.find((pr)=>pr.id===id)
  if(deleteID){
    await fs.promises.unlink(this.#path)
  }

}

}




// crear una funcion para ejecutar las operaciones de manager
async function main() {
  const manager = new ProductManager();

  console.log(await manager.getProducts());

  await manager.addProduct(
    "manzana",
    "naranja",
    30,
    5,
    34,
    2
  );

 
//-----------------------------------


  console.log(await manager.getProductById(7));

  //-----------------------------------
  console.log(await manager.deleteProduct(7))


}

main();
console.log(main)
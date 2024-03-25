const fs = require('fs').promises

class ProductManager {
    constructor(path){
        this.products = []
        this.id = 0
        this.path = path
    }

    getProducts () {
        return this.products

    }

    getProductById (id) {
        const product = this.products.find(product => product.id === id)
        if (!product){
            throw new Error ("No se encontró un producto con este ID 🤔")
        }
        return product
    }

    addProducts (title, description, price, thumbnail, code, stock) {
        const existingProduct = this.products.find(product => product.code === code)
        if (existingProduct){
            throw new Error ("Ya existe un producto con este mismo código 🤗")
        }
        this.products.push({ id: this.id++, title, description, price, thumbnail, code, stock })
    }  
    deleteProductById (id) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1){
            throw new Error ("No se encontró para eliminar, un producto con este ID 🤔")
        }
        this.products.splice(index, 1)
        this.saveProducts()
    }

    updateProductById (id, newData) {

        const index = this.products.findIndex(product => product.id === id)

        if (index === -1){
            throw new Error ("No se encontró un producto con este ID 🤔")
        }

        if (newData.hasOwnProperty ("id") && newData.id !== id)
            throw new Error ("No se permite actualizar el Id de un Producto 🌩️💔")

        this.products[index] = {...this.products[index], ...newData}
        this.saveProducts()
        
    }  


    async saveProducts(){
        try{
            await fs.writeFile(this.path, JSON.stringify(this.products))
        } catch(error) {console.error ("Error al guardar los productos")
        }
    }
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            this.products = JSON.parse(data)
            this.id = this.products.length
        } catch (error) {
            console.error("Error al cargar los productos")
        }
    }


}

const nuevaInstancia1 = new ProductManager("listaProductos1")
const nuevaInstancia2 = new ProductManager("listaProductos2")


nuevaInstancia1.addProducts("Producto de prueba1", "Este es un producto de prueba1", 200, "sin Imagen1", "abc123", 25) 

nuevaInstancia1.addProducts("Producto de prueba2", "Este es un producto de prueba2", 201, "sin Imagen2", "abc124", 26)



nuevaInstancia2.addProducts("Producto de pruebaINST2", "Este es un producto de pruebaINST2", 201, "sin Imagen2INST2", "abc123", 26)

nuevaInstancia2.addProducts("Producto PARA Actualizar pruebaINST2.1", "Este es un producto de prueba PARA Actualizar INST2.1", 202, "sin Imagen2INST2.1", "abc124", 26)


let dataToUpdateTheProduct = {
    id: 5, // (*1)
    title: 'Producto Actualizado',
    description: 'Producto Actualizado',
    price: 200,
    thumbnail: 'sin Imagen1 Actualizada',
    code: 'abc123',
    stock: 25
}

//(*1) Error: No se permite actualizar el Id de un Producto 🌩️💔. [Protección contra cambio de ID]
// nuevaInstancia2.updateProductById(1, dataToUpdateTheProduct)



async function asincronaDeLecturasdePrueba () {
    try {
        await nuevaInstancia1.saveProducts()
        await nuevaInstancia2.saveProducts()

        console.log("Productos de la instancia 1: ", nuevaInstancia1.getProducts())
        console.log("Productos de la instancia 2: ", nuevaInstancia2.getProducts())

        // Prueba de funcion getProductById:
        // console.log(nuevaInstancia1.getProductById(2))
        // console.log(nuevaInstancia2.getProductById(1))

        // Eliminación de un Producto
        // await nuevaInstancia1.deleteProductById(1)
        // console.log("Productos después de eliminar el producto con ID 1:");
        // console.log(nuevaInstancia1.getProducts());

        // Actualización de Producto
        // console.log("Datos de mi producto antes de ser actualizado", nuevaInstancia2.getProductById (1))
        // nuevaInstancia2.updateProductById(1, dataToUpdateTheProduct)
        // console.log("Datos de mi producto actualizado", nuevaInstancia2.getProductById (1))

    } catch (error) {
        console.error(error)
    }
}

asincronaDeLecturasdePrueba () 









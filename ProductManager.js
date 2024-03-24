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
            throw new Error ("No se encontró un producto con este ID 🤔")
        }
        this.products.splice(index, 1);
        this.saveProducts();
    }

    updateProductById (id, newProduct) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1){
            throw new Error ("No se encontró un producto con este ID 🤔")
        }
        this.products[index] = {...this.products[index], ...newProduct};
        this.saveProducts();
    }  

    async saveProducts(){
        try{
            await fs.writeFile(this.path, JSON.stringify(this.products))
        } catch(error) {console.error ("Error al guardar los productos")
        }
    }
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.id = this.products.length;
        } catch (error) {
            console.error(`Error al cargar los productos: ${error}`);
        }
    }


}

const nuevaInstancia1 = new ProductManager()
const nuevaInstancia2 = new ProductManager()



nuevaInstancia1.addProducts("Producto de prueba1", "Este es un producto de prueba1", 200, "sin Imagen1", "abc123", 25) 

nuevaInstancia1.addProducts("Producto de prueba2", "Este es un producto de prueba2", 201, "sin Imagen2", "abc124", 26)

await nuevaInstancia1.saveProducts()




nuevaInstancia2.addProducts("Producto de pruebaINST2", "Este es un producto de pruebaINST2", 201, "sin Imagen2INST2", "abc123", 26)

await nuevaInstancia2.saveProducts()

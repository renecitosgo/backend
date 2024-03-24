class ProductManager {
    constructor(){
        this.products = []
        this.id = 0
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
}

const nuevaInstancia1 = new ProductManager()
const nuevaInstancia2 = new ProductManager()


nuevaInstancia1.addProducts("Producto de prueba1", "Este es un producto de prueba1", 200, "sin Imagen1", "abc123", 25) 

nuevaInstancia1.addProducts("Producto de prueba2", "Este es un producto de prueba2", 201, "sin Imagen2", "abc124", 26)

nuevaInstancia2.addProducts("Producto de pruebaINST2", "Este es un producto de pruebaINST2", 201, "sin Imagen2INST2", "abc123", 26)



try {
    console.log(nuevaInstancia1.getProductById(0)) // Imprime mi producto
} catch (error) {
    console.error('Error atrapado:', error.message)
}

try {
    console.log(nuevaInstancia1.getProductById(1)) // Imprime mi producto2 de instancia1 con Id1 ya que ahora existe el Id1 por que fué generado automaticamente (con id: this.id++)
} catch (error) {
    console.error('Error atrapado:', error.message)
}

try {
    console.log(nuevaInstancia1.getProductById(2)) // Lanza un error por que no se encontró el Id2
} catch (error) {
    console.error('Error atrapado:', error.message)
}

try {
    nuevaInstancia1.addProducts("Producto de prueba", "Este es un producto de prueba", 200, "sin Imagen", "abc123", 25) // me envía al catch por intentar agregar en instancia1 un code existente.
} catch (error) {
    console.error("Error atrapado:", error.message) // Lanza un error por que intento agregar en la misma instancia, un producto con el "code" ya existente. Por lo tanto el message: "Ya existe un producto con este mismo código 🤗"
}



console.log(nuevaInstancia1.getProducts()) //estpy mostrando mis 2 productos en una instancia
console.log(nuevaInstancia2.getProducts()) // estoy mostrando mi único producto en OTRA instancia

// esto debería se de mi rama 2doentregable y no de main
import express from "express"

import fs from 'fs/promises'



class CartManager {
    constructor(path){
        this.carts = []
        this.id = 0
        this.path = path
        this.loadCart()
    }

    getCarts(){
        return this.carts
    }

    getCartsById(id){
        const cart = this.carts.find(cart => cart.id === id)
        if(!cart)
            throw new Error ("No se encontró el carrito de compras con ese ID 💔")
        
        return cart
    }

    addCart(){
        this.carts.push({ id: this.id++, products: [] })
    }

    addProductToCart (cartId, productId){
        const cart = this.getCartsById(cartId)
        const product = cart.products.find(product => product.id === productId)

        if (product){
            product.quantity++
        } else {
            cart.products.push({ id: productId, quantity: 1})
        }
    }

    getProductsInCart(cartId) {
        const cart = this.getCartsById(cartId)
        return cart.products
    }

    addProductToCartById(cartId, productId) {
        const cart = this.getCartsById(cartId)
        const productIndex = cart.products.findIndex(product => product.id === productId)

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++
        } else {
            cart.products.push({ id: productId, quantity: 1 })
        }

        this.saveCart()
    }


    async saveCart(){
        try {
        await fs.acces(this.path, fs.constants.W_OK)
        await fs.writeFile(this.path, JSON.stringify(this.carts))
        console.log ("Carrito guardado correctamente 🙂")
        } catch (error) {
            console.error ("Error al guardar el carrito 🌩️💔", error)
        }
    }

    async loadCart(){
        try{
            await fs.access(this.path, fs.constants.R_OK)
            const statsCart = await fs.stat(this.path)
            if(!statsCart.isFile()) {
                throw new Error ("El path no corresponde a un carrito 💔🌩️")
            }
        }catch(error){
            console.error("Error al cargar el carrito", error)
        }
    }
}

export default CartManager
import { Router } from "express"

const router = Router()

const products = [
    { id: 1, title: "Product1", price: 100 },
    { id: 2, title: "Product2", price: 101 },
    { id: 3, title: "Product3", price: 102 },
    { id: 4, title: "Product4", price: 103 },
    { id: 5, title: "Product5", price: 104 }
]

const user = {
    username: "renesgo",
    nombre: "René",
    apellido: "Llugdar",
    role: "admin"
}

router.get("/", (req, res)=>{
    res.render("home", {
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role === "admin",
        title: "Ecomerce || René",
        products,
        styles: "homeStyles.css"
    })
})


export default router
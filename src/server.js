import express from "express" 
// import usersRouter from "./routes/users-router.js"
import productsRouter from "./routes/products-router.js"
import viewsRouter from "./routes/views-router.js"
import cartsRouter from "./routes/routes-carts.js"
import { __dirname }  from "./utils.js"
import { uploader } from "./multer.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express() 

const httpServer = app.listen(8080, error =>{
    if(error)console.log(error)
    console.log("Server escuchando en puerto 8080 llp")
})

const socketServer = new Server(httpServer)


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))



// express usa este motor de plantilla
app.engine("handlebars", handlebars.engine())
// seteamos la dirección de mis vistas
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")


// para subir archivos
app.use("/subir-archivo", uploader.single("myFile"), (req, res)=>{
    if(!req.file){
        return res.send("No se puede subir el archivo")
    }
    res.send("Archivo subido")
})

app.use("/", viewsRouter)

// app.use("/api/users", usersRouter)

app.use("/api/products", productsRouter)

app.use("/api/carts", cartsRouter)




app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send("Error 500 en el server")
})


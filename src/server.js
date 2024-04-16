import express from "express" 
// import usersRouter from "./routes/users-router.js"
import productsRouter from "./routes/products-router.js"
import { __dirname }  from "./utils.js"
// import { uploader } from "./multer.js"

const app = express() 

console.log(import.meta.url)


//para la lectura de los json 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("src/public"))
// app.use("/static", express.static(__dirname+ "/public")) // ruta virtual!!

// para subir archivos
// app.use("/subir-archivo", uploader.single("myFile"), (req, res)=>{
//     if(!req.file){
//         return res.send("No se puede subir el archivo")
//     }
//     res.send("Archivo subido")
// })


// app.get("/", (req, res)=>{
//     res.status(200).send("<h1> Hola Coders, soy el get de Server</h1>")
// })


// http://localhost:8080 +

// app.use("/api/users", usersRouter)

app.use("/api/products", productsRouter)



// ------------------------------------------------------------------
app.listen(8080, error =>{
    if(error)console.log(error)
    console.log("Server escuchando en puerto 8080 llp")
})
// --------------------------------------------------------------------

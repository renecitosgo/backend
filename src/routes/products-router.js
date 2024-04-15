import { Router } from "express"

const router = Router()




router.get("/", (req, res)=>{
    res.send("get de productos con router")
})



router.get("/:pid", (req, res)=>{})



router.post("/", (req, res)=>{})



router.put("/:pid", (req, res)=>{})



router.delete("/:pid", (req, res)=>{})






export default router
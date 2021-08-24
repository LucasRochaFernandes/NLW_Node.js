import "reflect-metadata"

import express from "express";

import './database'

const app = express();

app.get('/', (req, res)=>{
    console.log("DANDO OS GETS")
})

app.post("/test-post", (req, res)=>{
    return res.send("Postado")
})

app.listen(8080, ()=> console.log("Rodando"))
import express from "express"

import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import booksRoute from './routes/booksRoute.js'
import path from "path"
import cors from 'cors'

import {PORT,mongoDBURL} from './config.js'

const app=express()
const _dirname=path.resolve()
app.use(express.json())
app.use(cors())
//app.use(cors({
  //  origin:'http://localhost:5173',
    //methods:['GET','POST','PUT','DELETE'],
   //allowedHeaders:['Content-Type']
//}))

app.use('/books',booksRoute)
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
app.get('/' ,(request,response)=>{
    console.log(request)
    return response.status(234).send('Hey welcome')
    })
mongoose.connect(mongoDBURL).then((result) => {
    console.log('App connected to database')
    app.listen(PORT,()=>{
        console.log(`App is listening to ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
});
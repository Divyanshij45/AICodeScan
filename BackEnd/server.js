require('dotenv').config()

const app = require('./src/app')
const express = require('./src/app')


app.get('/',(req,res)=>{
    res.send('Hello World')
})



app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000')
} )
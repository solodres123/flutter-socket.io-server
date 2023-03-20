const express = require('express');
const path=require('path');
require('dotenv').config();

const app= express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
const publicPath= path.resolve(__dirname,'public')

require('./sockets/socket')

app.use(express.static(publicPath));

server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto',process.env.PORT);

})
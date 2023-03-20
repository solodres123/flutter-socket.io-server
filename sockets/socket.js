//mensajes de sockets
const {io} = require('../index');
const Bands= require('../models/bands')
const Band= require('../models/band')
const bands= new Bands();


bands.addBand(new Band('hola1'));
bands.addBand(new Band('hola2'));
bands.addBand(new Band('hola3'));
bands.addBand(new Band('hola4'));
console.log(bands);


io.on('connection', client => {
    console.log('Cliente conectado')
    client.emit('bandas-activas',bands.getBands())
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(payload)=>{
        console.log('loquisimo',payload)
        io.emit('mensaje',{admin:'nuevo mensaje'})
    })
    client.on('nuevo-mensaje',(payload)=>{
        console.log('mensaje recibido de flutter',payload)
        client.broadcast.emit('nuevo-mensaje-otro-usuario',payload)
    })
    client.on('new-vote',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('bandas-activas',bands.getBands())
    })
    client.on('new-band',(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('bandas-activas',bands.getBands())
        })
    client.on('erased-band',(payload)=>{
        bands.deleteBands(payload.id);
        io.emit('bandas-activas',bands.getBands())
    })

  });
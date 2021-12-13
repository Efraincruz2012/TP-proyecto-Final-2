const express = require('express')
const path = require('path')

const { routerProducto } = require("./src/router/producto")
 
const { routerCarrito } = require("./src/router/carrito")
 
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs');

const ControladorProducto = require('./Daos/ControladorDaoProducto');
const ControladorCarrito = require('./Daos/ControladorDaoCarrito');

app.get('/', async (req, res) => {
    const productos = await new ControladorProducto().listarAll();
    const carritos = await new ControladorCarrito().listarAll();
    res.render('index', { productos, carritos } );
});

/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/productos', routerProducto)
 
app.use('/api/carrito', routerCarrito)
 
/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
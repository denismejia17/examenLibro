const express = require('express');
const router = express.Router();

// Importar los controladores de libros y pedidos
const libroController = require('../controllers/libroscontroller.js'); // Ruta al controlador de libros
const usuarioController = require('../controllers/usuarioscontroller.js'); // Ruta al controlador de pedidos

// Rutas para Libros
router.post('/api/libros', libroController.createLibro);//crea Libro
router.get('/api/libros', libroController.retrieveAllLibros);//obtener todos los libros
router.get('/api/libros/:id', libroController.getLibroById);//obtiene libro por id
router.put('/api/libros/:id', libroController.updateLibroById);//modifica libro
router.delete('/api/libros/:id', libroController.deleteLibroById);//eliminar libro

// Rutas para Pedidos
router.post('/api/usuarios', usuarioController.createUsuario);//crear pedido
router.get('/api/usuarios', usuarioController.retrieveAllUsuarios);//obtiene todos los pedidos
router.get('/api/usuarios/:id', usuarioController.getUsuarioById);//obtiene pedido por id
router.put('/api/usuarios/:id', usuarioController.updateUsuarioById);//modifica pedido
router.delete('/api/usuarios/:id', usuarioController.deleteUsuarioById);//elimina pedido

module.exports = router;


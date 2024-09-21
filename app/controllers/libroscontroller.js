const db = require('../config/db.config.js');
const Libro = db.Libro; // Asegúrate de que el modelo se llama 'Libro'

exports.createLibro = async (req, res) => {
    let libro = {
        titulo: req.body.titulo,
        id_autor: req.body.id_autor,
        isbn: req.body.isbn,
        editorial: req.body.editorial,
        anio: req.body.anio,
        categoria: req.body.categoria,
        cantidad_disponible: req.body.cantidad_disponible,
        ubicacion: req.body.ubicacion
    };

    try {
        // Guardar el libro en la base de datos
        const result = await Libro.create(libro);
        res.status(200).json({
            message: "Libro creado exitosamente con id = " + result.id_libro,
            libro: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro!",
            error: error.message
        });
    }
};

exports.retrieveAllLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.status(200).json({
            message: "Todos los libros obtenidos exitosamente!",
            libros: libros
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los libros!",
            error: error.message
        });
    }
};

exports.getLibroById = async (req, res) => {
    let libroId = req.params.id;
    try {
        const libro = await Libro.findByPk(libroId);
        if (!libro) {
            return res.status(404).json({
                message: "No se encontró el libro con id = " + libroId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Libro obtenido exitosamente con id = " + libroId,
            libro: libro
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el libro!",
            error: error.message
        });
    }
};

exports.updateLibroById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            return res.status(404).json({
                message: "No se encontró el libro con id = " + libroId,
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                id_autor: req.body.id_autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio: req.body.anio,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };

            await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });
            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteLibroById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            return res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
};

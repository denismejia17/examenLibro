const db = require('../config/db.config.js');
const Usuario = db.Usuario; // Asegúrate de que el modelo se llama 'Usuario'

exports.createUsuario = async (req, res) => {
    let usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        fecha: req.body.fecha,
        estado: req.body.estado
    };

    try {
        // Guardar el usuario en la base de datos
        const result = await Usuario.create(usuario);
        res.status(200).json({
            message: "Usuario creado exitosamente con id = " + result.id_usuario,
            usuario: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario!",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json({
            message: "Todos los usuarios obtenidos exitosamente!",
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los usuarios!",
            error: error.message
        });
    }
};

exports.getUsuarioById = async (req, res) => {
    let usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Usuario obtenido exitosamente con id = " + usuarioId,
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el usuario!",
            error: error.message
        });
    }
};

exports.updateUsuarioById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                fecha: req.body.fecha,
                estado: req.body.estado
            };

            await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });
            res.status(200).json({
                message: "Usuario actualizado exitosamente con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteUsuarioById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};

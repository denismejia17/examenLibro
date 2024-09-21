module.exports = (sequelize, Sequelize) => {
	
	const Libro = sequelize.define('libro', {	
		id_libro: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		titulo: {
			type: Sequelize.STRING
		},
		id_autor: {
			type: Sequelize.INTEGER
		},
		isbn: {
			type: Sequelize.STRING
		},
		editorial: {
			type: Sequelize.STRING
		},
		anio: {
			type: Sequelize.INTEGER
		},
		categoria: {
			type: Sequelize.STRING
		},
		cantidad_disponible: {
			type: Sequelize.INTEGER
		},
		ubicacion: {
			type: Sequelize.STRING
		}
	});
    
	return Libro;
}


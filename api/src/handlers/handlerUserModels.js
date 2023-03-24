// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const { User, Admin, Postulant, Company, Offers } = require("../models/relations.js");

// Post
const createUsers = async ({ username, email, rol, names, lastnames, phone, disability, active, gender, password, companyname, description, location, website, logo, experience, tecnology }) => {
    try {
        const [usuario, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                lastnames,
                rol,
                active,
                password,
                companyname,
                logo,
                website,
                description,
                location,
                email
            }
        });
        // if(usuario) {
        // return usuario.dataValues
        // }
        if (usuario) {
        switch (rol) {
            case 'Postulante':
                const postulant = await Postulant.create({      //nueva modificacion experiencia y tecnologia modelo postulant
                    names, lastnames, phone, disability, gender, experience, tecnology,
                    userId: usuario.id
                });
                return { ...usuario.dataValues, postulant }
            case 'Empresa':
                const company = await Company.create({
                    username, companyname, lastnames, password, email, description, location, website, logo,
                    userId: usuario.id
                });
                return { ...usuario.dataValues, company }
            default:
                throw 'Tipo de usuario no válido'
        }
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

//      Activos
const getUsers = async () => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Admin,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Postulant,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Company,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Offers,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                }
            ],
            where: {
                active: true
            },
        });
        return users
    } catch (error) {

    }
};
const getUsersByName = async (name) => {
    const users = await User.findAll({
        where: {
            nombres: { [Op.iLike]: `%${name}%` },
            estado: 1
        },
    });
    return users;
};

const getUsersByEmail = async (email) => {
    try {
        const users = await User.findOne({ where: { email: email } });        
        return users
    } catch (error) {
        throw error
    }
};

const getUsersById = async (id) => {
    const user = await User.findByPk(id, {
        where: {
            estado: 1
        },
    });
    return user;
};

const getUsersByIdCforanea = async ({id}) => {
    const user = await User.findOne({ where: {id: id} , 
        
        include: [{ model: Company}, {model: Postulant}]        
    });
    return user;
};

//      Inactivos
const getUsersInact = async () => {
    const usersInact = await User.findAll({
        where: {
            estado: 0
        },
    });
    return usersInact;
};
const getUsersInactById = async (id) => {
    const userInact = await User.findByPk(id, {
        where: {
            estado: 0
        },
    });
    return userInact;
};

// Puts
const putUsers = async (id, nombres, apellidos, celular, correo, discapacidad, genero) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk(id);
    if (!user) throw Error(`El usuario con id: ${id} no existe`);

    // Comprueba si falta algun dato
    if (!nombres || !apellidos || !celular || !correo || !discapacidad || !genero) throw Error('Faltan Datos');

    // Actualiza los datos
    await User.update(
        { nombres, apellidos, celular, correo, discapacidad, genero },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};
const putState = async (id, estado) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk(id);
    if (!user) throw Error(`El id: ${id} no existe`);

    // Actualiza el estado
    await Users.update(
        { estado },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};

// Delete
const deleteUsers = async (id) => {
    const deleteUsers = await User.findByPk(id);
    await deleteUsers.destroy();
    return `${deleteUsers.nombres} ha sido eliminado con éxito de la base de datos.`;
};

module.exports = {
    createUsers,
    getUsers,
    getUsersById,
    getUsersByName,
    getUsersInact,
    getUsersInactById,
    putUsers,
    putState,
    deleteUsers,
    getUsersByEmail,
    getUsersByIdCforanea
};
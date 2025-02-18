const users = require("../data/users");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "ILovePastel";

const userService = {
    login: (email, password) => {
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user.id, type: user.type }, SECRET_KEY, { expiresIn: "1h" });

        return token;
    },

    createUser: (name, email, type, password) => {
        if (users.some(user => user.email === email)) throw new Error("O E-mail digitado já existe!");

        const newUser = { id: users.length + 1, name, email, type, password };
        users.push(newUser);
        return newUser;
    },

    getUsers: () => {
        return users;
    },

    getUserById: (id) => {
        const user = users.find(u => u.id === parseInt(id));
        if (!user) throw new Error("Usuário não encontrado");
        return user;
    },

    updateUser: (id, name, email, type, password) => {
        const user = users.find(u => u.id === parseInt(id));
        if (!user) throw new Error("Usuário não encontrado!");


        if (type && user.type === "admin" && type !== "admin") {
            throw new Error("Não é possível alterar o tipo de admin para outro tipo");
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (type) user.type = type;
        if (password) user.password = password;

        return user;
    },

    deleteUser: (id) => {
        const index = users.findIndex(u => u.id === parseInt(id));

        if (index === -1) throw new Error("Usuário não encontrado");

        users.splice(index, 1);
        return { message: "Usuário deletado!" };
    }
};

module.exports = userService;

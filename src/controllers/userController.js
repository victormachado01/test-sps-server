const userService = require("../services/userService");

const userController = {
    login: (req, res) => {
        const { email, password } = req.body;

        try {
            const token = userService.login(email, password);

            res.json({ token });

        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    createUser: (req, res) => {
        const { name, email, type, password } = req.body;

        if (!name || !email || !type || !password)
            return res.status(400).json({ message: "All fields are required" });

        try {
            const newUser = userService.createUser(name, email, type, password);

            res.status(201).json(newUser);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getUsers: (req, res) => {
        const users = userService.getUsers();
        res.json(users);
    },

    getUserById: (req, res) => {
        const { id } = req.params;
        try {
            const user = userService.getUserById(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    updateUser: (req, res) => {
        const { id } = req.params;

        const { name, email, type, password } = req.body;

        try {
            const updatedUser = userService.updateUser(id, name, email, type, password);

            res.json(updatedUser);

        } catch (error) {
            res.status(error.message === "User not found" ? 404 : 400).json({ message: error.message });
        }
    },

    deleteUser: (req, res) => {
        const { id } = req.params;

        try {
            const message = userService.deleteUser(id);

            res.json(message);

        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};

module.exports = userController;

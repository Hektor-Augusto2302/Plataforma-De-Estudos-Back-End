const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ errors: ['Este email já está em uso'] });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(),
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const registerAdminUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem criar novos usuários administradores' });
        }

        const { name, email, password } = req.body;

        const userAdmin = await User.findOne({ email });
        if (userAdmin) {
            return res.status(422).json({ error: 'Este email já está em uso' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdminUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        res.status(201).json({
            _id: newAdminUser._id,
            token: generateToken(),
        });
    } catch (error) {
        console.error('Erro ao registrar usuário administrador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] });
            return;
        }

        if (!(await bcrypt.compare(password, user.password))) {
            res.status(422).json({ errors: ["Senha inválida."] });
            return;
        }

        res.status(201).json({
            _id: user._id,
            profileImage: user.profileImage,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const update = async (req, res) => {
    try {
        const { name, password } = req.body;

        let profileImage = null;

        if (req.file) {
            profileImage = req.file.filename;
        }

        const reqUser = req.user;

        const user = await User.findById(reqUser._id).select("-password");

        if (name) {
            user.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
};

const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(404).json({ errors: ["Usuario não encontrado"] })
            return;
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuario não encontrado"] })
        return;
    }
};

module.exports = {
    registerUser,
    registerAdminUser,
    login,
    update,
    getCurrentUser,
    getUserById,
}

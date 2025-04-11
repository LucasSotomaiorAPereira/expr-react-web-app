import { db } from "../db.js";

export const getUsers = (_, res) => {
    const query = "SELECT name, age, cpf FROM users";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    console.log("adding user <- api");
    const query = "INSERT INTO users (`name`, `age`, `cpf`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.age,
        req.body.cpf,
    ];

    db.query(query, values, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been added successfully.");
    });
};

export const delUser = (req, res) => {
    const query = "DELETE FROM users WHERE `name` = ?";

    const userName = req.params.name || req.body.name;

    if (!userName) {
        return res.status(400).json("User name is required for deletion.");
    }

    db.query(query, [userName], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been deleted.");
    });
};

export const updateUser = (req, res) => {
    const query = "UPDATE users SET `name` = ?, `age` = ?, `cpf` = ? WHERE `name` = ?";
    const values = [
        req.body.name,
        req.body.age,
        req.body.cpf,
        req.body.targetName
    ];

    db.query(query, values, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been updated.");
    });
};
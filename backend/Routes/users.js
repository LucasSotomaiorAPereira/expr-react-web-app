import express from "express";
import { getUsers, addUser, delUser, updateUser } from "../Controllers/users.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.put('/update', updateUser);
router.delete('/del', delUser);

export default router;
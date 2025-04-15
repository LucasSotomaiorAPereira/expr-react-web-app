import express from "express";
import { getLinguagens, addLinguagem, deleteLinguagem, updateLinguagem } from "../Controllers/users.js";

const router = express.Router();

router.get('/', getLinguagens);
router.post('/add', addLinguagem);
router.put('/update', updateLinguagem);
router.delete('/del', deleteLinguagem);

export default router;
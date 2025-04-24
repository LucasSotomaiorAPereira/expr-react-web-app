import express from "express";
import { getLanguages, addLanguage, deleteLanguage, updateLanguage } from "../Controllers/users.js";

const router = express.Router();

router.get('/', getLanguages);
router.post('/add', addLanguage);
router.put('/update', updateLanguage);
router.delete('/del', deleteLanguage);

export default router;
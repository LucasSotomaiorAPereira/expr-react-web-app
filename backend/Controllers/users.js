import { db } from "../db.js";

export const getLanguages = (_, res) => {
    const query = "SELECT id, nome, ano_criacao, criador, paradigma_principal, tipagem, site_oficial, descricao FROM Linguagens";

    db.query(query, (err, data) => {
        if (err) {
            console.error("Erro ao carregar as linguagens:", err);
            return res.status(500).json({ error: "Erro na querry do banco", details: err.message });
        }
        return res.status(200).json(data);
    });
};

export const addLanguage = (req, res) => {
    console.log("adding language <- api");
    const query = "INSERT INTO Linguagens (`nome`, `ano_criacao`, `criador`, `paradigma_principal`, `tipagem`, `site_oficial`, `descricao`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.name,
        req.body.creationYear,
        req.body.creator,
        req.body.mainParadigm,
        req.body.typing,
        req.body.officialSite,
        req.body.description,
    ];

    const languageNameFromBody = req.body.name;

    if (!languageNameFromBody) {
         return res.status(400).json("O nome da linguagem é obrigatório.");
    }

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error adding language:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Conflict: Language with this name already exists.", details: err.message });
            }
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        return res.status(201).json({ message: "Linguagem adicionada com sucesso.", insertedId: data.insertId });
    });
};

export const deleteLanguage = (req, res) => {
    console.log("deleting language by name <- api");
    const query = "DELETE FROM Linguagens WHERE `nome` = ?";

    const languageName = req.body.name;

    if (!languageName) {
      return res.status(400).json({ message: "O nome da linguagem a ser deletada é obrigatório no corpo da requisição." });
    }

    db.query(query, [languageName], (err, data) => {
        if (err) {
            console.error("Error deleting language:", err);
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json("Linguagem não encontrada.");
        }
        return res.status(200).json("Linguagem excluída com sucesso.");
    });
};

export const updateLanguage = (req, res) => {
    console.log("updating language by name <- api");
    const query = "UPDATE Linguagens SET `nome` = ?, `ano_criacao` = ?, `criador` = ?, `paradigma_principal` = ?, `tipagem` = ?, `site_oficial` = ?, `descricao` = ? WHERE `nome` = ?";

    const targetName = req.body.targetName;

    if (!targetName) {
      return res.status(400).json({ message: "O nome da linguagem a ser atualizada (targetName ou nomeAlvo) é obrigatório no corpo da requisição." });
    }

    const values = [
        req.body.name,
        req.body.creationYear,
        req.body.creator,
        req.body.mainParadigm,
        req.body.typing,
        req.body.officialSite,
        req.body.description,
        targetName
    ];

    const newLanguageNameFromBody = req.body.name;

    if (!newLanguageNameFromBody) {
        return res.status(400).json("O novo nome da linguagem (name ou nome no corpo da requisição) é obrigatório.");
    }

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error updating language:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Conflict: Another language with this name already exists.", details: err.message });
            }
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json("Linguagem não encontrada ou nenhum dado alterado.");
        }
        return res.status(200).json("Linguagem atualizada com sucesso.");
    });
};
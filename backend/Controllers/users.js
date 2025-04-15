import { db } from "../db.js";

export const getLinguagens = (_, res) => {
    const query = "SELECT id, nome, ano_criacao, criador, paradigma_principal, tipagem, site_oficial, descricao FROM Linguagens";
    
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching linguagens:", err); 
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        return res.status(200).json(data);
    });
};

export const addLinguagem = (req, res) => {
    console.log("adding linguagem <- api");
    const query = "INSERT INTO Linguagens (`nome`, `ano_criacao`, `criador`, `paradigma_principal`, `tipagem`, `site_oficial`, `descricao`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.nome,
        req.body.ano_criacao,
        req.body.criador,
        req.body.paradigma_principal,
        req.body.tipagem,
        req.body.site_oficial,
        req.body.descricao,
    ];

    if (!req.body.nome) {
         return res.status(400).json("O nome da linguagem é obrigatório.");
    }

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error adding linguagem:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Conflict: Linguagem with this name already exists.", details: err.message });
            }
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        return res.status(201).json({ message: "Linguagem adicionada com sucesso.", insertedId: data.insertId });
    });
};

export const deleteLinguagem = (req, res) => {
    console.log("deleting linguagem by name <- api");
    const query = "DELETE FROM Linguagens WHERE `nome` = ?";

    const linguagemNome = req.body.nome;

    if (!linguagemNome) {
      return res.status(400).json({ message: "O nome da linguagem a ser deletada é obrigatório no corpo da requisição." });
    }


    db.query(query, [linguagemNome], (err, data) => {
        if (err) {
            console.error("Error deleting linguagem:", err);
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json("Linguagem não encontrada.");
        }
        return res.status(200).json("Linguagem excluída com sucesso.");
    });
};

export const updateLinguagem = (req, res) => {
    console.log("updating linguagem by name <- api");
    const query = "UPDATE Linguagens SET `nome` = ?, `ano_criacao` = ?, `criador` = ?, `paradigma_principal` = ?, `tipagem` = ?, `site_oficial` = ?, `descricao` = ? WHERE `nome` = ?";

    const nomeAlvo = req.body.nomeAlvo;

    if (!nomeAlvo) {
      return res.status(400).json({ message: "O nome da linguagem a ser atualizada (nomeAlvo) é obrigatório no corpo da requisição." });
    }
    
    const values = [
        req.body.nome,
        req.body.ano_criacao,
        req.body.criador,
        req.body.paradigma_principal,
        req.body.tipagem,
        req.body.site_oficial,
        req.body.descricao,
        nomeAlvo
    ];

    if (!req.body.nome) {
        return res.status(400).json("O novo nome da linguagem (no corpo da requisição) é obrigatório.");
    }

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error updating linguagem:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Conflict: Another linguagem with this name already exists.", details: err.message });
            }
            return res.status(500).json({ error: "Database query error", details: err.message });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json("Linguagem não encontrada ou nenhum dado alterado.");
        }
        return res.status(200).json("Linguagem atualizada com sucesso.");
    });
};
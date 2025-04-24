import React, { useState } from "react";

export function Crud() {
    const [languageToAdd, setLanguageToAdd] = useState({ nome: "", ano_criacao: "", criador: "", paradigma_principal: "", tipagem: "", site_oficial: "", descricao: "" });
    const [updateInfo, setUpdateInfo] = useState({ targetNome: "", newNome: "", newAno_criacao: "", newCriador: "", newParadigma_principal: "", newTipagem: "", newSite_oficial: "", newDescricao: "" });
    const [deleteInfo, setDeleteInfo] = useState({ nome: "" });

    const adicionarLinguagem = () => {
        const reqBody = {
            nome: languageToAdd.nome,
            ano_criacao: parseInt(languageToAdd.ano_criacao),
            criador: languageToAdd.criador,
            paradigma_principal: languageToAdd.paradigma_principal,
            tipagem: languageToAdd.tipagem,
            site_oficial: languageToAdd.site_oficial,
            descricao: languageToAdd.descricao
        };

        fetch("http://localhost:8800/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                console.log("Linguagem adicionada: ", reqBody);
                setLanguageToAdd({ nome: "", ano_criacao: "", criador: "", paradigma_principal: "", tipagem: "", site_oficial: "", descricao: "" });
                 alert("Linguagem adicionada com sucesso! Atualize a página de listagem para ver.");
            })
            .catch((error) => {
                console.error("Erro ao adicionar linguagem:", error);
                 alert(`Erro ao adicionar: ${error.message}`);
            });
    };

    const atualizarLinguagem = () => {
         const reqBody = {
            nomeAlvo: updateInfo.targetNome,
            nome: updateInfo.newNome,
            ano_criacao: parseInt(updateInfo.newAno_criacao),
            criador: updateInfo.newCriador,
            paradigma_principal: updateInfo.newParadigma_principal,
            tipagem: updateInfo.newTipagem,
            site_oficial: updateInfo.newSite_oficial,
            descricao: updateInfo.newDescricao
        };


        fetch("http://localhost:8800/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                 return response.json().then(err => { throw new Error(err.message || `Erro ${response.status}`) });
            }
             return response.json();
        })
        .then((responseData) => {
            console.log("Resposta da atualização:", responseData);
            setUpdateInfo({ targetNome: "", newNome: "", newAno_criacao: "", newCriador: "", newParadigma_principal: "", newTipagem: "", newSite_oficial: "", newDescricao: "" });
            alert("Linguagem atualizada com sucesso! Atualize a página de listagem para ver.");
        })
        .catch((error) => {
            console.error("Erro ao atualizar linguagem:", error);
             alert(`Erro ao atualizar: ${error.message}`);
        });
    };

    const deletarLinguagem = () => {
        let reqBody = { nome: deleteInfo.nome };

        fetch("http://localhost:8800/del", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
             if (!response.ok) {
                 return response.json().catch(() => response.text())
                     .then(errBody => {
                        let message = `Erro ${response.status}`;
                        if (typeof errBody === 'object' && errBody.message) {
                            message = errBody.message;
                        } else if (typeof errBody === 'string' && errBody.length > 0) {
                             message = errBody.substring(0, 100);
                        }
                        throw new Error(message);
                     });
             }
             return {};
        })
        .then(() => {
             console.log(`Linguagem "${deleteInfo.nome}" deletada (ou requisição enviada).`);
             setDeleteInfo({ nome: "" });
             alert("Linguagem deletada com sucesso! Atualize a página de listagem para ver.");
        })
        .catch((error) => {
            console.error("Erro ao deletar linguagem:", error);
            alert(`Erro ao deletar: ${error.message}`);
        });
    };


    return (
        <>
            <h1>Gerenciar Linguagens (CRUD)</h1>

            <div className="form-section add-user-form">
                <h2>Adicionar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={languageToAdd.nome}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, nome: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Ano de Criação"
                    value={languageToAdd.ano_criacao}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, ano_criacao: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Criador"
                    value={languageToAdd.criador}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, criador: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Paradigma Principal"
                    value={languageToAdd.paradigma_principal}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, paradigma_principal: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Tipagem"
                    value={languageToAdd.tipagem}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, tipagem: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Site Oficial (URL)"
                    value={languageToAdd.site_oficial}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, site_oficial: e.target.value })}
                />
                 <textarea
                    placeholder="Descrição"
                    value={languageToAdd.descricao}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, descricao: e.target.value })}
                 />
                <button className="btn-list" onClick={adicionarLinguagem}>
                    Adicionar
                </button>
            </div>

            <div className="form-section update-user-form">
                <h2>Atualizar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome da Linguagem a Atualizar"
                    value={updateInfo.targetNome}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, targetNome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Novo Nome"
                    value={updateInfo.newNome}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newNome: e.target.value })}
                />
                 <input
                    type="number"
                    placeholder="Novo Ano de Criação"
                    value={updateInfo.newAno_criacao}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newAno_criacao: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Novo Criador"
                    value={updateInfo.newCriador}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newCriador: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Novo Paradigma Principal"
                    value={updateInfo.newParadigma_principal}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newParadigma_principal: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Nova Tipagem"
                    value={updateInfo.newTipagem}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newTipagem: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Novo Site Oficial (URL)"
                    value={updateInfo.newSite_oficial}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newSite_oficial: e.target.value })}
                />
                 <textarea
                    placeholder="Nova Descrição"
                    value={updateInfo.newDescricao}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newDescricao: e.target.value })}
                 />
                <button className="btn-list" onClick={atualizarLinguagem}>
                    Atualizar
                </button>
            </div>

            <div className="form-section delete-user-form">
                <h2>Deletar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome da Linguagem a Deletar"
                    value={deleteInfo.nome}
                    onChange={(e) => setDeleteInfo({ ...deleteInfo, nome: e.target.value })}
                />
                <button className="btn-list btn-delete" onClick={deletarLinguagem}>
                    Deletar
                </button>
            </div>
        </>
    )
}
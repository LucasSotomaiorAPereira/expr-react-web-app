import React, { useState } from "react";

export function Crud() {
    const [languageToAdd, setLanguageToAdd] = useState({ name: "", creationYear: "", creator: "", mainParadigm: "", typing: "", officialSite: "", description: "" });
    const [updateInfo, setUpdateInfo] = useState({ targetName: "", newName: "", newCreationYear: "", newCreator: "", newMainParadigm: "", newTyping: "", newOfficialSite: "", newDescription: "" });
    const [deleteInfo, setDeleteInfo] = useState({ name: "" });

    const addLanguage = () => {
        const reqBody = {
            name: languageToAdd.name,
            creationYear: parseInt(languageToAdd.creationYear),
            creator: languageToAdd.creator,
            mainParadigm: languageToAdd.mainParadigm,
            typing: languageToAdd.typing,
            officialSite: languageToAdd.officialSite,
            description: languageToAdd.description
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
                setLanguageToAdd({ name: "", creationYear: "", creator: "", mainParadigm: "", typing: "", officialSite: "", description: "" });
                 alert("Linguagem adicionada com sucesso! Atualize a página de listagem para ver.");
            })
            .catch((error) => {
                console.error("Erro ao adicionar linguagem:", error);
                 alert(`Erro ao adicionar: ${error.message}`);
            });
    };

    const updateLanguage = () => {
         const reqBody = {
            targetName: updateInfo.targetName,
            name: updateInfo.newName,
            creationYear: parseInt(updateInfo.newCreationYear),
            creator: updateInfo.newCreator,
            mainParadigm: updateInfo.newMainParadigm,
            typing: updateInfo.newTyping,
            officialSite: updateInfo.newOfficialSite,
            description: updateInfo.newDescription
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
            setUpdateInfo({ targetName: "", newName: "", newCreationYear: "", newCreator: "", newMainParadigm: "", newTyping: "", newOfficialSite: "", newDescription: "" });
            alert("Linguagem atualizada com sucesso! Atualize a página de listagem para ver.");
        })
        .catch((error) => {
            console.error("Erro ao atualizar linguagem:", error);
             alert(`Erro ao atualizar: ${error.message}`);
        });
    };

    const deleteLanguage = () => {
        let reqBody = { name: deleteInfo.name };

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
             console.log(`Linguagem "${deleteInfo.name}" deletada (ou requisição enviada).`);
             setDeleteInfo({ name: "" });
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

            <div className="form-section add-language-form">
                <h2>Adicionar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={languageToAdd.name}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Ano de Criação"
                    value={languageToAdd.creationYear}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, creationYear: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Criador"
                    value={languageToAdd.creator}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, creator: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Paradigma Principal"
                    value={languageToAdd.mainParadigm}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, mainParadigm: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Tipagem"
                    value={languageToAdd.typing}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, typing: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Site Oficial (URL)"
                    value={languageToAdd.officialSite}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, officialSite: e.target.value })}
                />
                 <textarea
                    placeholder="Descrição"
                    value={languageToAdd.description}
                    onChange={(e) => setLanguageToAdd({ ...languageToAdd, description: e.target.value })}
                 />
                <button className="list-button" onClick={addLanguage}>
                    Adicionar
                </button>
            </div>

            <div className="form-section update-language-form">
                <h2>Atualizar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome da Linguagem a Atualizar"
                    value={updateInfo.targetName}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, targetName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Novo Nome"
                    value={updateInfo.newName}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newName: e.target.value })}
                />
                 <input
                    type="number"
                    placeholder="Novo Ano de Criação"
                    value={updateInfo.newCreationYear}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newCreationYear: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Novo Criador"
                    value={updateInfo.newCreator}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newCreator: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Novo Paradigma Principal"
                    value={updateInfo.newMainParadigm}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newMainParadigm: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Nova Tipagem"
                    value={updateInfo.newTyping}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newTyping: e.target.value })}
                />
                 <input
                    type="text"
                    placeholder="Novo Site Oficial (URL)"
                    value={updateInfo.newOfficialSite}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newOfficialSite: e.target.value })}
                />
                 <textarea
                    placeholder="Nova Descrição"
                    value={updateInfo.newDescription}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newDescription: e.target.value })}
                 />
                <button className="list-button" onClick={updateLanguage}>
                    Atualizar
                </button>
            </div>

            <div className="form-section delete-language-form">
                <h2>Deletar Linguagem</h2>
                <input
                    type="text"
                    placeholder="Nome da Linguagem a Deletar"
                    value={deleteInfo.name}
                    onChange={(e) => setDeleteInfo({ ...deleteInfo, name: e.target.value })}
                />
                <button className="list-button delete-button" onClick={deleteLanguage}>
                    Deletar
                </button>
            </div>
        </>
    );
}
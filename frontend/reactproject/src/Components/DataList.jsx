import React, { useEffect, useState } from "react";

const DataList = (props) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({name: "", age: "", cpf: "" });
    const [updateInfo, setUpdateInfo] = useState({ targetName: "", newName: "", newAge: "", newCpf: "" });
    const [deleteInfo, setDeleteInfo] = useState({ name: "" });

    const busrcarUsuarios = () => {
        fetch("http://localhost:8800")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }

    useEffect(() => {
        busrcarUsuarios();
    }, []);



    const adicionarUsuario = () => {
        let reqBody = {name: user.name, age: parseInt(user.age), cpf: user.cpf };
        fetch("http://localhost:8800/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
         })
            .then((response) => response.json())
            .then(() => {
                console.log("TESTE-> ",reqBody);
                setData([...data, reqBody]);
                setUser({name: "", age: "", cpf: ""});
            })
            .catch((error) => {
                console.error("Erro ao adicionar usuário:", error);
            });
    };

    const atualizarUsuario = () => {
        let reqBody = {
            targetName: updateInfo.targetName,
            name: updateInfo.newName,
            age: parseInt(updateInfo.newAge),
            cpf: updateInfo.newCpf
        };
        let updatedUserData = {
            name: updateInfo.newName,
            age: parseInt(updateInfo.newAge),
            cpf: updateInfo.newCpf
        };
        fetch("http://localhost:8800/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
            .then((response) => response.json())
            .then(() => {
                setData(currentData => {
                    const index = currentData.findIndex(user => user.name === updateInfo.targetName);

                    if (index !== -1) {
                        const newData = [...currentData];
                        newData[index] = updatedUserData;
                        return newData;
                    } else {
                        console.warn(`Usuário "${updateInfo.targetName}" não encontrado no estado local para atualização.`);
                        return currentData;
                    }
                });
                setUpdateInfo({ targetName: "", newName: "", newAge: "", newCpf: "" });
            })
            .catch((error) => {
                console.error("Erro ao atualizar usuário:", error);
            });
    };

    const deletarUsuario = () => {
        let reqBody = { name: deleteInfo.name };
        fetch("http://localhost:8800/del", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
            .then((response) => response.json())
            .then(() => {
                setData(data.filter(usuario => usuario.name !== deleteInfo.name));
                setDeleteInfo({ name: "" });
            })
            .catch((error) => {
                console.error("Erro ao atualizar usuário:", error);
            });
    };


    return (
        <div>
            <div className="form-section add-user-form">
                <h2>Adicionar Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={user.age}
                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={user.cpf}
                    onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                />
                <button className="btn-list" onClick={adicionarUsuario}>
                    Adicionar
                </button>
            </div>

            <div className="form-section update-user-form">
                <h2>Atualizar Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome do Usuário a Atualizar"
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
                    placeholder="Nova Idade"
                    value={updateInfo.newAge}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newAge: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Novo CPF"
                    value={updateInfo.newCpf}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, newCpf: e.target.value })}
                />
                <button className="btn-list" onClick={atualizarUsuario}>
                    Atualizar
                </button>
            </div>

            <div className="form-section delete-user-form">
                <h2>Deletar Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome do Usuário a Deletar"
                    value={deleteInfo.name}
                    onChange={(e) => setDeleteInfo({ ...deleteInfo, name: e.target.value })}
                />
                <button className="btn-list btn-delete" onClick={deletarUsuario}>
                    Deletar
                </button>
            </div>


            <h1 className="title">Listando Usuários</h1>
            {data.length === 0 ? (
                <p>Nenhum usuário encontrado ou carregando...</p>
            ) : (
                <ul className="list">
                    {data.map((item, index) => (
                        <li key={index} className="li-list">
                            <div>
                                Nome: {item.name}<br />
                                Idade: {item.age}<br />
                                CPF: {item.cpf}
                            </div>
                            {props.clicked && (
                                <button className="btn-list" onClick={() => props.clicked(item)}>
                                    Mais detalhes
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DataList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export function Languages() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const buscarLinguagens = () => {
        fetch("http://localhost:8800")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar linguagens:", error);
            });
    }

    useEffect(() => {
        buscarLinguagens();
    }, []);

    function handleDetailsClick(item) {
        navigate('/details', { state: { item: item } });
    }

    return (
        <>
            <h1 className="title">Listando Linguagens</h1>
            {data.length === 0 ? (
                <p>Nenhuma linguagem encontrada ou carregando...</p>
            ) : (
                <ul className="list">
                    {data.map((item, index) => (
                        <li key={index} className="li-list">
                            <div>
                                Nome: {item.nome}<br />
                                Ano de criação: {item.ano_criacao}<br />
                                Criador: {item.criador}<br />
                                Paradigma principal: {item.paradigma_principal}<br />
                                Tipagem: {item.tipagem}<br />
                                Site Oficial: <a href={item.site_oficial} target="_blank" rel="noopener noreferrer">{item.site_oficial}</a><br />
                                Descrição: {item.descricao}<br />
                            </div>
                            {/* Updated Button to use navigate */}
                            <button className="btn-list" onClick={() => handleDetailsClick(item)}>
                                Mais detalhes
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
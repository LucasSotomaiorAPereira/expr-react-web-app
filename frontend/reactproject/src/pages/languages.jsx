import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Languages() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchLanguages = () => {
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
        fetchLanguages();
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
                        <li key={index} className="list-item">
                            <div>
                                Nome: {item.nome}<br /> 
                            </div>
                            <button className="list-button" onClick={() => handleDetailsClick(item)}>
                                Mais detalhes
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
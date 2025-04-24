import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Details() {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item;

    if (!item) {
        return (
            <div>
                <h1>Detalhes da Linguagem</h1>
                <p>Nenhuma linguagem selecionada. Volte para a lista e clique em 'Mais detalhes'.</p>
                <button onClick={() => navigate('/')}>Voltar para Lista</button>
            </div>
        );
    }

    function goBack() {
        navigate('/');
    }

    return (
        <div>
            <h1>Detalhes da Linguagem</h1>
            <div className="details-content">
                <p><strong>Nome:</strong> {item.nome}</p>
                <p><strong>Ano de Criação:</strong> {item.ano_criacao}</p>
                <p><strong>Criador:</strong> {item.criador}</p>
                <p><strong>Paradigma Principal:</strong> {item.paradigma_principal}</p>
                <p><strong>Tipagem:</strong> {item.tipagem}</p>
                <p><strong>Site Oficial:</strong> <a href={item.site_oficial} target="_blank" rel="noopener noreferrer">{item.site_oficial}</a></p>
                <p><strong>Descrição:</strong> {item.descricao}</p>
                <button onClick={goBack}>Voltar para Lista</button>
            </div>
        </div>
    );
}
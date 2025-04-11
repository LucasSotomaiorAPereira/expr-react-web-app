import "./App.css"; // Importa os estilos da aplicação
import DataList from "./components/DataList";
import { useState } from "react";

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [itemClicked, setItemClicked] = useState(null);

    function clicked(item) {
        console.log("Clicou no item", item.id);
        setModalIsOpen(true);
        setItemClicked(item);
    }

    function closeModal() {
        setModalIsOpen(false);
        setItemClicked(null);
    }

    return (
        <div>
            <DataList clicked={clicked} />

            {modalIsOpen && itemClicked && (
                <div className="modal">
                    <div className="modal-content">
                        <h1>Detalhes do Usuário</h1>
                        <p><strong>Nome:</strong> {itemClicked.name}</p>
                        <p><strong>Idade:</strong> {itemClicked.age}</p>
                        <p><strong>CPF:</strong> {itemClicked.cpf}</p>
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
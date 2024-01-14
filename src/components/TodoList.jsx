import React, { useEffect, useState } from "react";
import Icon from "../assets/icon.png";
import './TodoList.css';
import { FaTrashAlt } from "react-icons/fa";

export default function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {

        localStorage.setItem('Lista', JSON.stringify(lista));

    }, [lista]);

    function addTarefa(form) {

        form.preventDefault();

        if (!novoItem) {
            return;
        }

        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");

        document.getElementById("input-entrada").focus();

    }

    function atualizarEstado(index) {

        const listaAux = [...lista];

        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletarTarefa(index) {

        const listaAux = [...lista];

        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTarefas() {
        setLista([]);
    }


    return (
        <div className="container">

            <h1>Lista de Tarefas</h1>

            <form onSubmit={addTarefa}>

                <input id="input-entrada" type="text" placeholder="Adicione uma tarefa" value={novoItem} onChange={(e) => { setNovoItem(e.target.value) }} />

                <button type="submit" className="btn-add">Add</button>

            </form>

            <div className="lista-tarefas">

                <div>

                    {
                        lista.length < 1 ? (
                            <img className="icone" src={Icon} />
                        ) : (
                            lista.map((item, index) => (

                                <div key={index} className={item.isCompleted ? "item completo" : "item"}>

                                    <span onClick={() => { atualizarEstado(index) }}>{item.text}</span>

                                    <button onClick={() => { deletarTarefa(index) }} className="del">
                                        <FaTrashAlt />
                                    </button>

                                </div>
                            ))
                        )

                    }

                    {
                        lista.length > 0 && (
                            <button onClick={() => { deletarTarefas() }} className="delete-all">
                                Deletar todas
                            </button>
                        )

                    }

                </div>

            </div>

        </div>
    )
}
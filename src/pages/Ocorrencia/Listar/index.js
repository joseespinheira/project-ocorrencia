import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

function Ocorrencia() {
    let navigate = useNavigate();

    const handleClickAdd = async () => {
        navigate(`/home/ocorrencia/add`);
    }

    const [ocorrencias, setOcorrencias] = useState([
        {
            "Id": 1,
            "name": "FABIO SANTANA DOS SANTOS",
            "title": "fabiosantanagif@gmail.com",
            "description": null,
            "cpf": "10110212",
            "rg": "1215415",
            "email": "fabiosantanagif@gmail.com",
            "address": "2 Travessa Do Ouro , Liberdade",
            "issuings_id": 2,
            "user_id": null,
            "type_occurrences": null,
            "latitude": "-12.970400",
            "longitude": "-38.512400",
            "created_at": "16/12/2021"
        },
        {
            "Id": 2,
            "name": "FABIO SANTANA DOS SANTOS",
            "title": "fabiosantanagif@gmail.com",
            "description": "TESTE",
            "cpf": "10110212\t1215415",
            "rg": "10110212\t1215415",
            "email": "fabiosantanagif@gmail.com",
            "address": "2 Travessa Do Ouro , Liberdade",
            "issuings_id": 2,
            "user_id": null,
            "type_occurrences": null,
            "latitude": "-12.970400",
            "longitude": "-38.512400",
            "created_at": "16/12/2021"
        }
    ]);

    return (
        <div>Listar Ocorrencias

            <ul>
                {ocorrencias.map((ocorrencia) => <div className="border" key={ocorrencia.Id}>{ocorrencia.description}</div>)}
            </ul>

            <div className="fab">
                <button className="main">
                </button>
                <ul>
                    <li>
                        <label for="opcao1">Adicionar Ocorrência</label>
                        <button id="opcao1" onClick={handleClickAdd}>
                            +
                        </button>
                    </li>
                    {/* <li>
                        <label for="opcao2">Opção 2</label>
                        <button id="opcao2">
                            ⎗
                        </button>
                    </li>
                    <li>
                        <label for="opcao3">Opção 3</label>
                        <button id="opcao3">
                            ☏
                        </button>
                    </li> */}
                </ul>
            </div>
        </div>
    );
}

export default Ocorrencia;

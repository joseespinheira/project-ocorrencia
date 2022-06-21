import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import api from '../../../services/index';

function getTypeOccurrences(type) {
    switch (type) {
        case 1:
            return "Pendente"
        default:
            return "Desconhecido"
    }
}

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
            "description": "ocorencia de lixo",
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
            address: "2 Travessa Do Ouro , Liberdade",
            cpf: null,
            created_at: "21/06/2022",
            description: "sdsds",
            email: "fabiosantanagif@gmail.com",
            issuings_id: 1,
            latitude: "-12.970400",
            longitude: "-12.970400",
            name: "Teste 10",
            nameStatus: null,
            rg: "101121515",
            status_occurrences_id: 1,
            title: "fabiosantanagif@gmail.com",
            type_occurrences: 1,
            user_id: null
        }
    ]);

    useEffect(() => {
        async function getData() {
            const dados = await api.get('/occurrences');
            setOcorrencias(dados.data.data);
        }
        getData();
    }, [])

    const handleClickDetalhe=(id)=>{
        console.log("ask")
        navigate(`/home/ocorrencia/${id}`);
    }
    return (
        <div>
            <label className="m-2">Listar ocorrências</label>
            <ul className="p-1">
                {ocorrencias.map(ocorrencia =>
                    <li key={ocorrencia.Id}>
                        <div onClick={()=>handleClickDetalhe(ocorrencia.Id)} className="border rounded p-1 mb-1 d-flex justify-content-between" >
                            <div className="d-flex flex-column">
                                <label><b> {ocorrencia.description} </b></label>
                                <label> {ocorrencia.created_at}</label>
                            </div>
                            <span className="badge text-bg-info align-self-center">
                                {getTypeOccurrences(ocorrencia.type_occurrences)}
                            </span>
                        </div>
                    </li>
                )}
            </ul>

            <div className="fab">
                <button className="main">
                </button>
                <ul>
                    <li onClickCapture={handleClickAdd} >
                        <label htmlFor="opcao1" onClick={handleClickAdd}>Adicionar Ocorrência</label>
                        <button id="opcao1">
                            +
                        </button>
                    </li>
                    {/* <li>
                        <label htmlFor="opcao2">Opção 2</label>
                        <button id="opcao2">
                            ⎗
                        </button>
                    </li>
                    <li>
                        <label htmlFor="opcao3">Opção 3</label>
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

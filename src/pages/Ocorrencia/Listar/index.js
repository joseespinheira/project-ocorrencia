import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import api from '../../../services/index';
import { RecuperarDado } from "../../../components/Storage";

function getTypeOccurrences(type) {
    switch (type) {
        case 1:
            return "Aberta"
        case 2:
            return "Fechada"
        case 3:
            return "Em andamento"
        default:
            return "Desconhecido"
    }
}

function Ocorrencia() {
    let navigate = useNavigate();
    const [carregando, setCarregando] = useState(true)
    // const [usuario, setUsuario] = useState({})

    const handleClickAdd = async () => {
        navigate(`/home/ocorrencia/add`);
    }

    const [ocorrencias, setOcorrencias] = useState([]);

    useEffect(() => {
        async function getData() {

            //recupera usuario
            const dadoUsuarioJson = await RecuperarDado('@SOAPP_USUARIO');
            const dadoUsuario = await JSON.parse(dadoUsuarioJson);
            // setUsuario(dadoUsuario);

            let header = {}
            if (!dadoUsuario) {
                navigate('/')
            }
            //https://sopadmin.herokuapp.com/api/occurrences/getOccurrenceByClientId/
            const dados = await api.get(`/occurrences/getOccurrenceByClientId/${dadoUsuario.id}`);
            setOcorrencias(dados.data.data);
            setCarregando(false);
        }
        getData();
    }, [])

    const handleClickDetalhe = (id) => {
        navigate(`/home/ocorrencia/${id}`);
    }

    return (<>
        {
            carregando ?
                <div className="bg-secondary h-100 w-100" >
                    <div className="d-flex align-items-center justify-content-center h-50 w-100 bg-secondary" >
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div >
                </div > :
                <div>
                    <label className="m-2">Listar ocorrências</label><hr className="mt-1"></hr>
                    <ul className="p-1">

                        {ocorrencias.length > 0 ? ocorrencias.map((ocorrencia, index) =>
                            <li key={index}>
                                <div onClick={() => handleClickDetalhe(ocorrencia.id)} className="border rounded p-1 mb-1 d-flex justify-content-between" >
                                    <div className="d-flex flex-column">
                                        <label><b> {ocorrencia.id} - {ocorrencia.title} </b></label>
                                        <label> {ocorrencia.created_at}</label>
                                    </div>
                                    <span className="badge text-bg-info align-self-center">
                                        {getTypeOccurrences(ocorrencia.type_occurrences)}
                                    </span>
                                </div>
                            </li>
                        ) : "Não há ocorrencias cadastradas"}
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
        }
    </>);
}

export default Ocorrencia;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import api from "../../../services";
import './style.css';

const OcorrenciaDetalhe = () => {
    let { id } = useParams();
    const [ocorrencia, setOcorrencia] = useState({})
    const [carregando, setCarregando] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {

        async function getData() {
            const dados = await api.get('occurrences/' + id);
            setOcorrencia(dados.data.data);
            setCarregando(false);
        }
        getData();
    }, [id])


    const handleVoltar = () => {
        navigate(`/home/ocorrencia`);
    }

    return (
        <>
            {
                carregando ?
                    <div className="bg-secondary h-100 w-100" >
                        <div className="d-flex align-items-center justify-content-center h-50 w-100 bg-secondary" >
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div >
                    </div > :
                    <div className="m-3">


                        <div ><h3>Detalhe da ocorrências:</h3></div>

                        <div >
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>name:</label>
                                <label>{ocorrencia.name}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>title:</label>
                                <label>{ocorrencia.title}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>Descrição:</label>
                                <label>{ocorrencia.description}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>latitude:</label>
                                <label>{ocorrencia.latitude}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>longitude:</label>
                                <label>{ocorrencia.longitude}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>status_occurrences_id:</label>
                                <label>{ocorrencia.status_occurrences_id}</label>
                            </div>
                            <div className="d-flex flex-column mb-3 border p-1 rounded">
                                <label>nameStatus:</label>
                                <label>{ocorrencia.nameStatus}</label>
                            </div>
                        </div>
                        <div className="align-items-left d-flex">
                            <Button onClick={handleVoltar} >Voltar</Button>
                        </div>
                    </div>
            }
        </>
    )
}

export default OcorrenciaDetalhe;
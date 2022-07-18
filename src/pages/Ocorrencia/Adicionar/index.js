import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { TextField } from "@mui/material";

const AdicionarOcorrencia = () => {
    let navigate = useNavigate();
    const [endereco, setEndereco] = useState(false);

    const handleTirarFoto = () => {
        navigate(`/home/ocorrencia/addFoto`);
    }

    const handleDigitarEndereco = () => {
        setEndereco(true);
    }
    
    const handleSelecionarMapa = () => {
        setEndereco(false);
        navigate(`/home/ocorrencia/addMapa`);
    }
    
    
        const handleSalvar = () => {
            //validar dados
        }
    
        const handleCancelar = () => {
            navigate(`/home/ocorrencia/`);
        }
    return (<div>
        <label>Criar Ocorrência</label>
        <div>
            <Button className="m-1" onClick={handleTirarFoto}> Tirar Foto</Button>
            {/* <Button className="m-1">Selecionar foto</Button> */}
        </div>
        <Accordion className="mb-2 mt-2">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Endereço da ocorrência</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div>
                        <input type="radio" className="btn-check" name="opcao-mapa" id="selecionar-mapa" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="selecionar-mapa" onClick={handleSelecionarMapa}>Selecionar no mapa</label>

                        <input type="radio" className="btn-check" name="opcao-mapa" id="digitar-endereco" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="digitar-endereco" onClick={handleDigitarEndereco}>Digitar endereço</label>

                        {!endereco ? '' :
                            <div className="d-grid mt-3">
                                <TextField className="mb-3" id="cep" label="CEP" variant="outlined" />
                                <TextField className="mb-3" id="endereco" label="Endereço" variant="outlined" />
                                <TextField className="mb-3" id="bairro" label="Bairro" variant="outlined" />
                                <TextField className="mb-3" id="cidade" label="Cidade" variant="outlined" />
                                <TextField className="mb-3" id="estado" label="Estado" variant="outlined" />
                                {/* 
                                <label htmlFor="cep">CEP:</label>
                                <input type="text" name="cep" id="cep" />
                                <label htmlFor="endereco">Endereço:</label>
                                <input type="text" name="endereco" id="endereco" />
                                <label htmlFor="bairro">Bairro:</label>
                                <input type="text" name="bairro" id="bairro" />
                                <label htmlFor="cidade">Cidade:</label>
                                <input type="text" name="cidade" id="cidade" />
                                <label htmlFor="estado">Estado:</label>
                                <input type="text" name="estado" id="estado" /> 
                                */}
                            </div>
                        }
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Dados da ocorrência</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div className="d-grid">
                        <TextField className="mb-3" id="title" label="Titulo" variant="outlined" />
                        <TextField className="mb-3" id="tipo-ocorrencia" label="Tipo da ocorrência" variant="outlined" />
                        <TextField className="mb-3" id="description" label="Descrição" variant="outlined" />
                        {/* 
                        <label htmlFor="title">Titulo:</label>
                        <input type="text" name="title" id="title" />
                        <label htmlFor="tipo-ocorrencia">Tipo da ocorrência:</label>
                        <input type="text" name="tipo-ocorrencia" id="tipo-ocorrencia" />
                        <label htmlFor="description">Descrição:</label>
                        <input type="text" name="description" id="description" /> 
                        */}
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
        <div style={{ height: 50 }}></div>
        <div class="card-footer" style={{
            borderTop: 1,
            bottom: 0,
            solid: true,
            color: '#333',
            background: "#00000029",
            left: 0,
            height: 50,
            position: "fixed",
            width: '100%'
        }}>
            <div className="m-2 d-flex justify-content-around">
                <div>
                    <Button type="button" class="btn btn-danger" onClick={handleCancelar}>Cancelar</Button>
                </div>
                <div>
                    <Button type="button" class="btn btn-success" onClick={handleSalvar}>Salvar</Button>
                </div>
            </div>
        </div>
    </div>)
}

export default AdicionarOcorrencia;
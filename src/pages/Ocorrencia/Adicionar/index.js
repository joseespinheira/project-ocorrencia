import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import api from "../../../services";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GuardarDado, RecuperarDado, RemoverItem } from "../../../components/Storage";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdicionarOcorrencia = () => {
    let navigate = useNavigate();
    const [botaoIndicaEnderecoDigitado, setBotaoIndicaEnderecoDigitado] = useState(null);
    const [typeOccurrence, setTypeOccurrence] = useState([]);
    const [typeOccurrenceSelected, setTypeOccurrenceSelected] = useState('');
    const [localizacao, setLocalizacao] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [usuario, setUsuario] = useState({});
    const title = useRef('');
    const description = useRef('');
    const [mensagemErro, setMensagemErro] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const cep = useRef('');
    const endereco = useRef('');
    const bairro = useRef('');
    const cidade = useRef('');
    const estado = useRef('');

    const [request, setRequest] = useState({
        // name: "Teste 10",
        // title: "",
        // description: "sdsds",
        // cpf: null,
        // rg: 101121515,
        // email: "",//email do usuario
        issuings_id: 1,//orgao
        // clients_id: null,//usuario que fez o cadastro
        // type_occurrences_id: null,//tipo de ocorrencia
        status_occurrences_id: "1",//status ex aberta, fechada
        // address: "2 Travessa Do Ouro , Liberdade",
        // user_id: null,
        // latitude: "-12.970400",
        // longitude: "-12.970400",
        // cnpj: "18181223000168",
        users_id: "9999"//nao sei
    })

    useEffect(() => {
        async function getTypeOccurrence() {
            try {
                //recupera informacao do botao de endereco selecionado
                const botaoEndereco = await RecuperarDado('@SOAPP_FORMULARIO_BOTAO_ENDERECO');
                setBotaoIndicaEnderecoDigitado(botaoEndereco === 'true' ? true : botaoEndereco === 'false' ? false : null);
                // recupera os tipos de ocorrencias
                const typeOccurrence = await api.get('typeOccurrence');
                setTypeOccurrence(typeOccurrence.data.data);
                // recupera a latitude e longitude quando tiver
                if (botaoIndicaEnderecoDigitado !== null) {
                    const jsonLocalizacao = await RecuperarDado('@SOAPP_LOCALIZACAO');
                    const localizacao = await JSON.parse(jsonLocalizacao);
                    setLocalizacao(localizacao);
                }
                // recupera informacoes do usuario
                const dadoUsuarioJson = await RecuperarDado('@SOAPP_USUARIO');
                const dadoUsuario = await JSON.parse(dadoUsuarioJson);
                if(dadoUsuario===null){
                    //caso o usuario não esteja autenticado
                    navigate('/');
                }
                setUsuario(dadoUsuario);

                // recupera informacoes das imagens
                const dadoImagemJson = await RecuperarDado('@SOAPP_IMAGENS');
                const dadoImagem = await JSON.parse(dadoImagemJson);
                setImagem(dadoImagem);

            } catch (e) {
                console.log(e);
                console.log("erro ao pegar tipo de ocorrencia");
            }
        }
        getTypeOccurrence();
    }, [])

    const handleTirarFoto = () => {
        navigate(`/home/ocorrencia/addFoto`);
    }

    const handleSelecionarMapa = () => {
        setBotaoIndicaEnderecoDigitado(false);
        GuardarDado('@SOAPP_FORMULARIO_BOTAO_ENDERECO', false)
        navigate(`/home/ocorrencia/addMapa`);
    }

    const handleDigitarEndereco = async () => {
        setBotaoIndicaEnderecoDigitado(true);
        await GuardarDado('@SOAPP_FORMULARIO_BOTAO_ENDERECO', true)

    }

    const validaCamposObrigatorios = () => {
        //retorna true em caso de problemas
        console.log("aqui")
        if (botaoIndicaEnderecoDigitado === null) {
            setMensagemErro({
                title: "Alerta!",
                message: "É obrigatório preencher o endereço da ocorrência."
            })
            setOpen(true);
            return true;
        }

        return false;
    }

    const handleSalvar = (e) => {
        e.preventDefault();

        if (validaCamposObrigatorios()) {
            console.log("aqui")
            return
        }

        const titleVariavel = title.current.value;
        const descriptionVariavel = description.current.value;
        const cepVariavel = cep.current.value;
        const enderecoVariavel = endereco.current.value;
        const bairroVariavel = bairro.current.value;
        const cidadeVariavel = cidade.current.value;
        const estadoVariavel = estado.current.value;

        const dadoOcorrencia = {
            'title': titleVariavel,
            'description': descriptionVariavel,
            type_occurrences_id: typeOccurrenceSelected,
            clients_id: usuario.id,
            email: usuario.email,
            name: usuario.name
        }

        const dadoEndereco = {
            cep: cepVariavel,
            endereco: enderecoVariavel,
            bairro: bairroVariavel,
            cidade: cidadeVariavel,
            estado: estadoVariavel
        }

        //falta as imagens

        const data = { ...localizacao, ...dadoEndereco, ...dadoOcorrencia, ...imagem, ...request }

        async function salvar() {
            try {
                const response = await api.post("occurrences", data);

                if (response.status === 201) {
                    RemoverItem("@SOAPP_FORMULARIO_BOTAO_ENDERECO")
                    RemoverItem("@SOAPP_LOCALIZACAO")
                    RemoverItem("@SOAPP_IMAGENS")
                    navigate("/home/ocorrencia")
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        }
        salvar();
    }

    const handleChangeTypeOccurrence = (e) => {
        setTypeOccurrenceSelected(e.target.value);
    }

    const handleCancelar = () => {
        navigate(`/home/ocorrencia/`);
    }
    return (<div>
        <Dialog
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {mensagemErro.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {mensagemErro.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpen(false) }} autoFocus>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
        <label>Criar Ocorrência</label>
        <div>
            <Button className="m-1" onClick={handleTirarFoto}> Tirar Foto
            </Button>
            {/* <Button className="m-1">Selecionar foto</Button> */}
        </div>
        <Form onSubmit={handleSalvar}>
            <Accordion className="m-2 border">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        {(botaoIndicaEnderecoDigitado !== null) ?
                            <CheckCircleRoundedIcon
                                style={{ color: "#05cc30" }}
                                fontSize="default"
                            ></CheckCircleRoundedIcon>
                            :
                            <CloseRoundedIcon
                                style={{ color: "red" }}
                                fontSize="default"
                            ></CloseRoundedIcon>}
                        Endereço da ocorrência

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'div'} variant={'body2'}>
                        <div className="d-flex justify-content-around mb-2">
                            <div>
                                <input type="radio" className="btn-check selected" name="opcao-mapa" id="selecionar-mapa" autoComplete="off" defaultChecked={localizacao} />
                                <label className="btn btn-outline-primary" htmlFor="selecionar-mapa" onClick={handleSelecionarMapa} >Selecionar no mapa</label>

                            </div>
                            <input type="radio" className="btn-check" name="opcao-mapa" id="digitar-endereco" autoComplete="off" defaultChecked={botaoIndicaEnderecoDigitado} />
                            <label className="btn btn-outline-primary" htmlFor="digitar-endereco" onClick={handleDigitarEndereco}>Digitar endereço</label>
                        </div>

                        {!botaoIndicaEnderecoDigitado ? '' :
                            <>
                                <TextField className="mb-2" fullWidth id="cep" label="CEP" variant="outlined" inputRef={cep} />
                                <TextField className="mb-2" fullWidth id="endereco" label="Endereço" variant="outlined" inputRef={endereco} />
                                <TextField className="mb-2" fullWidth id="bairro" label="Bairro" variant="outlined" inputRef={bairro} />
                                <TextField className="mb-2" fullWidth id="cidade" label="Cidade" variant="outlined" inputRef={cidade} />
                                <TextField className="mb-2" fullWidth id="estado" label="Estado" variant="outlined" inputRef={estado} />
                            </>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Card >

                <CardContent>
                    <Typography className="d-flex mb-3" variant="h5" component="div">
                        Dados da ocorrência
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField fullWidth className="mb-2" id="title" label="Titulo" variant="outlined" inputRef={title} required />
                        <FormControl required fullWidth className="mb-2">
                            <InputLabel id="demo-simple-select-label">Tipo da ocorrência</InputLabel>
                            <Select required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeOccurrenceSelected}
                                label="Tipo da ocorrência"
                                onChange={handleChangeTypeOccurrence}
                            >
                                <MenuItem value={''}><em>Selecione...</em></MenuItem>
                                {typeOccurrence.map(item =>
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField fullWidth className="mb-2" id="description" label="Descrição" variant="outlined" inputRef={description} />
                    </Typography>
                </CardContent>
            </Card>
            {/* <Accordion className="m-2 border">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Dados da ocorrência</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'div'} variant={'body2'}>
                        <TextField fullWidth className="mb-2" id="title" label="Titulo" variant="outlined" inputRef={title} required />
                        <FormControl required fullWidth className="mb-2">
                            <InputLabel id="demo-simple-select-label">Tipo da ocorrência</InputLabel>
                            <Select required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeOccurrenceSelected}
                                label="Tipo da ocorrência"
                                onChange={handleChangeTypeOccurrence}
                            >
                                <MenuItem value={''}><em>Selecione...</em></MenuItem>
                                {typeOccurrence.map(item =>
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField fullWidth className="mb-2" id="description" label="Descrição" variant="outlined" inputRef={description} />
                    </Typography>
                </AccordionDetails>
            </Accordion> */}

            <div style={{ height: 50 }}></div>
            <div className="card-footer" style={{
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
                        <Button type="button" className="btn btn-danger" onClick={handleCancelar}>Cancelar</Button>
                    </div>
                    <div>
                        <Button type="submit" className="btn btn-success">Salvar</Button>
                    </div>
                </div>
            </div>
        </Form>



    </div>)
}

export default AdicionarOcorrencia;
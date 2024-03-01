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
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGeolocated } from "react-geolocated";

const GOOGLE_KEY = `key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

function AdicionarOcorrencia () {
    let navigate = useNavigate();
    const [botaoIndicaEnderecoDigitado, setBotaoIndicaEnderecoDigitado] = useState(null);
    const [typeOccurrence, setTypeOccurrence] = useState([]);
    const [typeOccurrenceSelected, setTypeOccurrenceSelected] = useState('');
    const [localizacao, setLocalizacao] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [usuario, setUsuario] = useState({});
    const [mensagemErro, setMensagemErro] = useState('');
    const [open, setOpen] = useState(false);
    const [openLocal, setOpenLocal] = useState(true);
    const [usarLocalAtual, setUsarLocalAtual] = useState(null);
    const [openFoto, setOpenFoto] = useState(false);
    const [carregando, setCarregando] = useState(true);
    
    const title = useRef('');
    const description = useRef('');
    const cep = useRef('');
    const endereco = useRef('');
    const bairro = useRef('');
    const cidade = useRef('');
    const estado = useRef('');

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });


    const request = {
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
        users_id: "1"//nao sei
    }

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
                //if (botaoIndicaEnderecoDigitado !== null) {
                const jsonLocalizacao = await RecuperarDado('@SOAPP_LOCALIZACAO');
                const localizacao = await JSON.parse(jsonLocalizacao);
                setLocalizacao(localizacao);
                //}

                // recupera informacoes do usuario
                const dadoUsuarioJson = await RecuperarDado('@SOAPP_USUARIO');
                const dadoUsuario = await JSON.parse(dadoUsuarioJson);
                if (dadoUsuario === null) {
                    //caso o usuario não esteja autenticado
                    navigate('/');
                }
                setUsuario(dadoUsuario);

                // recupera informacoes das imagens
                const dadoImagemJson = await RecuperarDado('@SOAPP_IMAGENS');
                const dadoImagem = await JSON.parse(dadoImagemJson);
                setImagem(dadoImagem);

                //recupera dados do furmulario
                const dadoFormularioJson = await RecuperarDado('@SOAPP_FORMULARIO_DATA');
                const dadoFormulario = await JSON.parse(dadoFormularioJson);

                setCarregando(false);
                if (dadoFormulario) {
                    if (botaoIndicaEnderecoDigitado) {
                        console.log("Au")
                        cep.current.value = dadoFormulario.cepVariavel ?? '';
                        endereco.current.value = dadoFormulario.enderecoVariavel ?? '';
                        bairro.current.value = dadoFormulario.bairroVariavel ?? '';
                        cidade.current.value = dadoFormulario.cidadeVariavel ?? '';
                        estado.current.value = dadoFormulario.estadoVariavel ?? '';
                    }
                    setTypeOccurrenceSelected(dadoFormulario.typeOccurrenceSelected);
                    setOpenFoto(dadoFormulario.openFoto);
                    setOpenLocal(dadoFormulario.openLocal);
                    setUsarLocalAtual(dadoFormulario.usarLocalAtual);
                    title.current.value = dadoFormulario.titleVariavel;
                    description.current.value = dadoFormulario.descriptionVariavel;
                }
            } catch (e) {
                console.log(e);
                console.log("erro");
            }
        }
        getTypeOccurrence();
    }, [navigate,botaoIndicaEnderecoDigitado])

    const SetDadosFurmulario = () => {
        const titleVariavel = title.current.value;
        const descriptionVariavel = description.current.value;
        const cepVariavel = cep.current.value;
        const enderecoVariavel = endereco.current.value;
        const bairroVariavel = bairro.current.value;
        const cidadeVariavel = cidade.current.value;
        const estadoVariavel = estado.current.value;

        const data = {
            titleVariavel,
            descriptionVariavel,
            cepVariavel,
            enderecoVariavel,
            bairroVariavel,
            cidadeVariavel,
            estadoVariavel,
            typeOccurrenceSelected,
            openLocal,
            openFoto: false,
            usarLocalAtual
        }

        GuardarDado('@SOAPP_FORMULARIO_DATA', JSON.stringify(data))
    }

    const handleTirarFoto = () => {
        SetDadosFurmulario();
        navigate(`/home/ocorrencia/addFoto`);
    }

    const handleSelecionarMapa = () => {
        SetDadosFurmulario();
        setBotaoIndicaEnderecoDigitado(false);
        GuardarDado('@SOAPP_FORMULARIO_BOTAO_ENDERECO', false)
        navigate(`/home/ocorrencia/addMapa`);
    }

    const handleDigitarEndereco = () => {
        setBotaoIndicaEnderecoDigitado(true);
        GuardarDado('@SOAPP_FORMULARIO_BOTAO_ENDERECO', true)

    }

    const validaCamposObrigatorios = () => {
        //retorna true em caso de problemas
        if(usarLocalAtual){
            return false;
        }
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

        

        async function salvar() {
            try {
                const config = {
                    headers: {
                      'content-type': 'image/jpeg;multipart/form-data'
                    },
                  };

                const data = new FormData();
                
                if(imagem && imagem.img){
                    imagem.img.forEach(foto => {
                        let blob = convertBase64ToBlob(foto);
                        data.append("anexo[]",blob,"arquivo.jpeg");
                    });
                }

                for (const chave in dadoOcorrencia) {
                    if (dadoOcorrencia.hasOwnProperty(chave)) {
                        data.append(chave, dadoOcorrencia[chave]);
                    }
                }
                for (const chave in request) {
                    if (request.hasOwnProperty(chave)) {
                        data.append(chave, request[chave]);
                    }
                }
                for (const chave in dadoEndereco) {
                    if (dadoEndereco.hasOwnProperty(chave)) {
                        data.append(chave, dadoEndereco[chave]);
                    }
                }
                for (const chave in localizacao) {
                    if (localizacao.hasOwnProperty(chave)) {
                        data.append(chave, localizacao[chave]);
                    }
                    if(!dadoEndereco.endereco){
                        const endereco = await recuperarEndereco(localizacao);
                        dadoEndereco.endereco = endereco;
                        data.append("address",endereco);
                    }
                }

                const response = await api.post("occurrences", data, config);

                if (response.status === 201) {
                    RemoverItem("@SOAPP_FORMULARIO_BOTAO_ENDERECO")
                    RemoverItem("@SOAPP_LOCALIZACAO")
                    RemoverItem("@SOAPP_IMAGENS")
                    RemoverItem("@SOAPP_FORMULARIO_DATA")
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

    async function recuperarEndereco (localizacao) {
        try{
            const resultado = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${localizacao.latitude},${localizacao.longitude}&${GOOGLE_KEY}`);
            const end = resultado.data.results[0];
            return end.formatted_address;
        }catch (e){
            console.log(e);
            return "-";
        }
    }

    /**
     * Convert BASE64 to BLOB
     * @param base64Image Pass Base64 image data to convert into the BLOB
     */
    function convertBase64ToBlob(base64Image) {
        // Split into two parts
        const parts = base64Image.split(';base64,');
    
        // Hold the content type
        const imageType = parts[0].split(':')[1];
    
        // Decode Base64 string
        const decodedData = window.atob(parts[1]);
    
        // Create UNIT8ARRAY of size same as row data length
        const uInt8Array = new Uint8Array(decodedData.length);
    
        // Insert all character code into uInt8Array
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
    
        // Return BLOB image after conversion
        return new Blob([uInt8Array], { type: imageType });
    }

    const handleChangeTypeOccurrence = (e) => {
        setTypeOccurrenceSelected(e.target.value);
    }

    const handleCancelar = () => {
        RemoverItem("@SOAPP_FORMULARIO_BOTAO_ENDERECO")
        RemoverItem("@SOAPP_LOCALIZACAO")
        RemoverItem("@SOAPP_IMAGENS")
        RemoverItem("@SOAPP_FORMULARIO_DATA")
        navigate(`/home/ocorrencia/`);
    }
    
    const setLocalAtual=()=>{
        if (coords) {
            try {
                setLocalizacao({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                })
                GuardarDado('@SOAPP_LOCALIZACAO', JSON.stringify({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }))
            } catch (e) {
                // saving error
            }
        }
    }

    return (<>{!carregando ? <div>

        {/* Pergunta se está no local da ocorrência se usuario pemitiu a geolocalizacao */}
        {!isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) :
            <Dialog
                open={openLocal}
                // onClose={() => { setOpenLocal(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Está no local da ocorrência?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        O aplicativo pode usar a localização atual para registrar a ocorrência?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenLocal(false); setOpenFoto(true); }}>
                        Não
                    </Button>
                    <Button onClick={() => { setOpenLocal(false); setUsarLocalAtual(true); setLocalAtual(); setOpenFoto(true); }} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        }

        {/* Pergunta se quer tirar uma foto */}
        <Dialog
            open={openFoto}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Foto
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deseja tirar uma foto?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpenFoto(false); SetDadosFurmulario(); }}>
                    Não
                </Button>
                <Button onClick={() => { setOpenFoto(false); handleTirarFoto(); }} autoFocus>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>

        {/* Aviso de validação */}
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
        <label className="m-2">Criar Ocorrência</label><hr className="mt-1" />
        <div>
            <Button className="m-1" onClick={handleTirarFoto}> Tirar Foto
            </Button>
            {/* <Button className="m-1">Selecionar foto</Button> */}
        </div>
        <Form onSubmit={handleSalvar}>

            {(!usarLocalAtual )?
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
:''}
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



    </div> : "Carregando..."}</>)
}

export default AdicionarOcorrencia;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import api from '../../../services/index';

function AdicionarFormulario() {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [request, setRequest] = useState({
        name: "Teste 10",
        title: "fabiosantanagif@gmail.com",
        description: "sdsds",
        cpf: null,
        rg: 101121515,
        email: "fabiosantanagif@gmail.com",
        issuings_id: 1,
        type_occurrences_id: 1,
        status_occurrences_id: "1",
        //address: "2 Travessa Do Ouro , Liberdade",
        //user_id: null,
        //latitude: "-12.970400",
        //longitude: "-12.970400",
        //cnpj: "18181223000168",
        users_id: "1"
    })
    const onSubmit = async dados => {
        //recuperar posicao do mapa e jogar no request
        const dataCoords = await AsyncStorage.getItem('@app_ocorrecia_localizacao');
        const coords = await JSON.parse(dataCoords);
        const data = { ...request, ...dados, ...coords }

        const response = await api.post('occurrences', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        navigate(`/home/ocorrencia`);
    };

    return (
        <div>
            <div className="m-3"> <h3>Formulário</h3></div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Input label="Nome" name="name" register={register} required />
                <Input label="Título" name="title" register={register} required />
                <Input label="Descrição" name="description" register={register} required />
                <Input label="E-mail" name="email" register={register} required />

                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <Button type="submit" className="botao" >Concluir</Button>
            </form>
        </div>
    );
}

export default AdicionarFormulario;

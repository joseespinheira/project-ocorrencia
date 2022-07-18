import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../services";

const AdicionarUsuario = () => {
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const senha = e.target.senha.value;
        const senhaConfirmacao = e.target.senhaConfirmacao.value;
        if (senha !== senhaConfirmacao) {
            console.log("Senha divergentes")
        }
        const data = {
            name,
            email,
            password: senha,
            device_name: "teste"
        }
        try {
            const retorno = await api.post('client', data);
            if (retorno.response.status === 201) {
                navigate(-1);
                console.log("Depois implementar login após o cadastro")
            } else {
                console.log(retorno);
                console.log(retorno.message);
                console.log("implementar tela de erro")
            }
        } catch (e) {
            console.log(e);
            console.log(e.message);
            console.log(e.response.data.message);
        }
    }

    return (<Container className="h-100">
        <Row className="h-100 justify-content-md-center align-items-center">
            <Col className="">
                <Form className="border border-primary rounded p-4" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <label>Cadastrar Usuário</label>
                    </div>
                    <hr></hr>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Nome" required autoComplete="false" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email" required autoComplete="false" />
                        <Form.Text className="text-muted" >
                            Nunca compartilhe seu e-mail com ninguém.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="senha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" required autoComplete="false" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="senhaConfirmacao">
                        <Form.Label>Confirmar Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha de confirmação" required autoComplete="false" />
                    </Form.Group>

                    <Button variant="danger" className="m-1" onClick={() => { navigate(-1) }}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className="m-1" type="submit">
                        Salvar
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>)
}
export default AdicionarUsuario;
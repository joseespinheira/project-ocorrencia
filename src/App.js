import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import api from "./services";
function App() {
  let navigate = useNavigate();

  const redirect = async (event) => {
    navigate(`/home/ocorrencia`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    const data = {
      email,
      password: senha,
      device_name: "teste"
    }
    try {
      const retorno = await api.post('sanctum/token', data);
      if (retorno.response.status === 200) {
        redirect();
      } else {
        console.log(retorno);
        console.log(retorno.message);
      }
    } catch (e) {
      console.log(e);
      console.log(e.message);
      console.log(e.response.data.message);
    }
  }
  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-md-center align-items-center">
        <Col className="">
          <Form className="border border-primary rounded p-4" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <label>SOAPP</label>
            </div>
            <hr></hr>

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

            <Button variant="primary" type="submit">
              Entrar
            </Button>
            <div>
              <Link to="usuario/novo">
                Clique aqui para criar um usuário
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

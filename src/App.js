import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
function App() {
  let navigate = useNavigate();

  const redirect = async (event) => {
    navigate(`/home/ocorrencia`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    redirect();
  }
  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-md-center align-items-center">
        <Col className="">
          <Form className="border border-primary rounded p-4" onSubmit={handleSubmit}>
            <label>Sistema</label>
            <hr></hr>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Email" />
              <Form.Text className="text-muted" >
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

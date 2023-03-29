import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import api from "./services";
import { GuardarDado, RemoverItem } from "./components/Storage";
import 'moment/locale/pt-br';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

function App() {
  const [aviso, setAviso] = useState(false);
  const [mensageErro, setMensageErro] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    RemoverItem("@SOAPP_FORMULARIO_BOTAO_ENDERECO")
    RemoverItem("@SOAPP_LOCALIZACAO")
    RemoverItem("@SOAPP_IMAGENS")
    RemoverItem("@SOAPP_USUARIO")
    RemoverItem("@SOAPP_TOKEN")
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    const data = {
      email,
      password: senha,
      device_name: "teste"
    }
    try {
      const retorno = await api.post('sanctum/token', data);
      if (retorno.status === 200) {
        const token = retorno.data[1];
        const usuario = await api.get('auth/me', { headers: { Authorization: `Bearer ${token}` } });

        const dadosUsuario = usuario.data.data;
        GuardarDado('@SOAPP_USUARIO', JSON.stringify(dadosUsuario));
        GuardarDado('@SOAPP_TOKEN', token);

        navigate('/home/ocorrencia')
      } else {
        console.log(retorno);
        console.log(retorno.message);
      }
    } catch (e) {
      console.log(e);
      console.log(e.message);
      setAviso(true)
      setMensageErro(e.message);
      console.log(e.response.data.message);
    }
  }
  return (
    <Container className="h-100">
      <Dialog
        open={aviso}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Erro
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {mensageErro}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => { setAviso(false); }} autoFocus>
                Ok
            </Button>
        </DialogActions>
    </Dialog>
      <Row className="h-100 justify-content-md-center align-items-center">
        <Col className="">
          <Form className="border border-primary rounded p-4" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h3>SOAPP</h3>
                <h6>Aplicativo de ocorrências</h6>
              </div>
            </div>
            <hr className="mt-0"></hr>

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
            <div className="mt-3">
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

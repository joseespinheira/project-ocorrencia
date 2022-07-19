import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { RemoverItem } from "../Storage";

function Layout() {
    const navigate = useNavigate();

    const handleSair=()=>{
        RemoverItem("@SOAPP_FORMULARIO_BOTAO_ENDERECO")
        RemoverItem("@SOAPP_LOCALIZACAO")
        RemoverItem("@SOAPP_IMAGENS")
        RemoverItem("@SOAPP_USUARIO")
        RemoverItem("@SOAPP_TOKEN")

        navigate("/");
    }

    return (
        <div  className="text-center h-100 w-100" >
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">SOAPP</Navbar.Brand>
                    <Nav className="w-100 me-auto d-flex justify-content-between">
                        <Nav.Link href="/home/ocorrencia">Ocorrências</Nav.Link>
                        <Nav.Link href="#" onClick={handleSair}>Sair</Nav.Link>
                        
                    </Nav>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;

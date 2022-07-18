import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div  className="text-center h-100 w-100" >
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Sistema</Navbar.Brand>
                    <Nav className="w-100 me-auto d-flex justify-content-between">
                        <Nav.Link href="/home/ocorrencia">Ocorrências</Nav.Link>
                        <Nav.Link href="/">Sair</Nav.Link>
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>

            <Outlet></Outlet>


        </div>
    );
}

export default Layout;

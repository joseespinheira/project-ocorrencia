import { Navbar, Nav, Container, Button, Col } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Sistema</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home/ocorrencia">Home</Nav.Link>
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>

            <Outlet />


        </div>
    );
}

export default Layout;

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {


    return (
        <div>home
            <Outlet />
        </div>
        
    );
}

export default Home;

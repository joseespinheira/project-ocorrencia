import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdicionarFoto() {
    let navigate = useNavigate();

    const handleSelecionar = async (event) => {
      navigate(`/home/ocorrencia/addFormulario`);
    }

    return (
        <div>Foto

            <Button className="botao" onClick={handleSelecionar}>Selecionar</Button>
        </div>
    );
}

export default AdicionarFoto;

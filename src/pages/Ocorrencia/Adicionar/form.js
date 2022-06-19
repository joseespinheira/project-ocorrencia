import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdicionarFormulario() {
    let navigate = useNavigate();

    const handleConcluir = async (event) => {
      navigate(`/home/ocorrencia`);
    }

    return (
        <div>Formulario

            <Button className="botao" onClick={handleConcluir}>Concluir</Button>
        </div>
    );
}

export default AdicionarFormulario;

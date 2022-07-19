import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from "./pages/Home";
import Ocorrencia from "./pages/Ocorrencia/Listar";
import Layout from "./components/Layout";
import AdicionarOcorrencia from "./pages/Ocorrencia/Adicionar";
import AdicionarFoto from "./pages/Ocorrencia/Adicionar/foto";
import AdicionarMapa from "./pages/Ocorrencia/Adicionar/mapa";
import AdicionarFormulario from "./pages/Ocorrencia/Adicionar/form";
import OcorrenciaDetalhe from "./pages/Ocorrencia/Detalhe";
import AdicionarUsuario from "./pages/Usuario/Adicionar";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/usuario/novo" element={<AdicionarUsuario />} />
      {/* Login */}
      <Route path="/" element={<App />} />

      {/* Sistema */}
      <Route path="home" element={<Layout />}>
        <Route path="ocorrencia/:id" element={<OcorrenciaDetalhe />} />
        <Route path="ocorrencia" element={<Ocorrencia />} />
        <Route path="ocorrencia/add" element={<AdicionarOcorrencia />} />
        <Route path="ocorrencia/addFoto" element={<AdicionarFoto />} />
        <Route path="ocorrencia/addMapa" element={<AdicionarMapa />} />
        <Route path="ocorrencia/addFormulario" element={<AdicionarFormulario />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

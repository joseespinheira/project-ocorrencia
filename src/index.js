import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Ocorrencia from "./pages/Ocorrencia/Listar";
import Layout from "./components/Layout";
import AdicionarOcorrencia from "./pages/Ocorrencia/Adicionar";
import AdicionarFoto from "./pages/Ocorrencia/Adicionar/foto";
import AdicionarFormulario from "./pages/Ocorrencia/Adicionar/form";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      {/* Login */}
      <Route path="/" element={<App />} />

      {/* Sistema */}
      <Route path="home" element={<Layout />}>
        <Route path="ocorrencia" element={<Ocorrencia />} >
        </Route>
          <Route path="ocorrencia/add" element={<AdicionarOcorrencia />} />
          <Route path="ocorrencia/addFoto" element={<AdicionarFoto />} />
          <Route path="ocorrencia/addFormulario" element={<AdicionarFormulario />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
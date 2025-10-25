import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdotantePage from './pages/Usuarios/AdotantePage.jsx';
import AdminPage from './pages/Usuarios/AdminPage.jsx';
import UsuariosRelatorio from './pages/Usuarios/UsuariosRelatorio.jsx';
import CadastroAnimal from './pages/Animais/CadastroAnimal.jsx';
import AnimaisPage from './pages/Animais/AnimaisPage.jsx';
import EditarAnimal from './pages/Animais/EditarAnimal.jsx';
import RegistrarAdocao from './pages/Adocao/RegistrarAdocao.jsx';
import AdocaoRelatorio from './pages/Adocao/AdocaoRelatorio.jsx';
import EditarUsuario from './pages/Usuarios/EditarUsuario.jsx';


//vou criar minhas routes para as pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register", //meu caminho
    element: <Register /> //page de cadastro de usuarios
  },
  {
    path: "/adotante",
    element: <AdotantePage />,
    children: [
      {
        index: true,
        element: <AnimaisPage />
      }
    ]
  },
  {
    path: "/admin", //pagina pai que rendezina as filhas quando chamadas
    element: <AdminPage />,
    children: [ //contém as paginas filhas
      {
        index: true, //mantem na pagina pai, mas rendenizando o componente abaixo
        element: <AnimaisPage />,
      },
      {
        path: "editar-animal/:id",
        element: <EditarAnimal />
      },
      {
        path: "cadastrar-animal",
        element: <CadastroAnimal />
      },
      {
        path: "registrar-adocao",
        element: <RegistrarAdocao />
      },
      {
        path: "editar-usuario/:id",
        element: <EditarUsuario />
      },
      {
        path: "usuarios",
        element: <UsuariosRelatorio />
      },
      {
        path: "relatorio-adocao",
        element: <AdocaoRelatorio />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
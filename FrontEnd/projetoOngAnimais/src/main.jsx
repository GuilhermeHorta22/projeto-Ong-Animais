import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdotantePage from './pages/AdotantePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import UsuariosRelatorio from './pages/UsuariosRelatorio.jsx';
import CadastroAnimal from './pages/CadastroAnimal.jsx';
import AnimaisPage from './pages/AnimaisPage.jsx';
import EditarAnimal from './pages/EditarAnimal.jsx';


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
    element: <AdotantePage />
  },
  {
    path: "/admin", //pagina pai que rendezina as filhas quando chamadas
    element: <AdminPage />,
    children: [ //contém as paginas filhas
      {
        index: true, //mantem na pagina pai, mas rendenizando o componente abaixo
        element: <AnimaisPage modo="admin" />,
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
        path: "usuarios",
        element: <UsuariosRelatorio />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdotantePage from './pages/AdotantePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AnimaisRelatorio from './pages/AnimaisRelatorio.jsx';
import UsuariosRelatorio from './pages/UsuariosRelatorio.jsx';
import CadastroAnimal from './pages/CadastroAnimal.jsx';


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
        path: "cadastrar-animal",
        element: <CadastroAnimal />
      },
      {
        path: "animais",
        element: <AnimaisRelatorio />
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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/login';
import Cadastro from './Pages/cadastro';
import AdminPage from './Pages/adminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

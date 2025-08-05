import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/authForm.css';
import '../style/global.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try
        {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
                });

            const data = await response.json();

            if(!response.ok)
            {
                setErro(data.error  || 'Erro ao fazer login.');
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('tipo', data.tipo);

            if (data.tipo === 'ADMIN')
                navigate('/admin');
            else
                navigate('/adotante');
        }
        catch(error)
        {
            console.error(error);
            setErro('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="containerStyle">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                <label className="labelStyle">Email:</label>
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="inputStyle" />
                </div>

                <div>
                <label className="labelStyle">Senha:</label>
                <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="inputStyle" />
                </div>

                {erro && <div className="errorStyle">{erro}</div>}

                <button type="submit" className="buttonStyle">Entrar</button>
                <p style={{ marginTop: 10 }}>Não tem conta? <Link to="/cadastro">Cadastrar-se</Link></p>
            </form>
        </div>
    );
}

export default Login;
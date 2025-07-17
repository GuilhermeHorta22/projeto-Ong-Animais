import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
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

            //aqui eu vou redirecionar para minhas paginas conforme o tipo da pessoa
            if(data.tipo === 'ADMIN')
                window.location.href = '/admin';
            else
                window.location.href = '/adotante';
        }
        catch(error)
        {
            setErro('Erro de conexão com o servidor.');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 10 }}>
            <label>Email:</label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 10 }}>
            <label>Senha:</label><br />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}
            <button type="submit">Entrar</button>
            <p>Não tem conta? <Link to="/cadastro">Cadastrar-se</Link></p>
        </form>
        </div>
    );
}

export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

function Login()
{
    const navigate = useNavigate(); //redirecionar rotas

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try
        {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if(!response.ok)
            {
                if(data.error)
                    setError(data.error);
                else
                if(data.message)
                    setError(data.message);
                else
                    setError("Erro ao fazer login.");
                return;
            }

            //armazenando as informacoes do usuario
            localStorage.setItem("token", data.token);
            localStorage.setItem("tipo", data.tipo);

            if(data.tipo === "ADMIN")
                navigate("/admin");
            else
                navigate("/adotante");
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    };

    return (
        <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
            <div className="w-[400px] bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-slate-800 text-2xl font-bold text-center mb-6">
                    Login do Sistema
                </h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(e);}} className="space-y-4">
                    <div>
                        <Label>E-mail</Label>
                        <Input
                            type="text"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    {error && (<p className="text-red-500 text-center">{error}</p>)}
                    <Button type="submit">Entrar</Button>
                </form>
                
                <div className="text-center text-stone-200 font-medium mt-4 select-none">
                    <p className="text-slate-800">
                        Não tem conta?{" "}
                        <Link to="/register" className="text-blue-700 hover:underline">
                        Cadastre-se
                        </Link>
                    </p>

                    <p className="text-slate-800">
                        Esqueceu a senha?{" "}
                        <Link to="/forgot-password" className="text-rose-700 hover:underline">
                        Trocar senha
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
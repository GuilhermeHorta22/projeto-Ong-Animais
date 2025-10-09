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

    const handleLogin = async () => {
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
                setError(data.error || "Erro ao efetuar login.");
                return;
            }

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
        <div className="w-screen h-screen bg-stone-200 flex justify-center items-center">
            <div className="w-[400px] bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-white text-2xl font-semibold text-center mb-6">
                    Login do Sistema
                </h1>

                <div>
                    <Label>Email</Label>
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

                <Button onClick={() => { console.log("Botão clicado"); handleLogin(); }}>Entrar</Button>


                <div className="text-center text-stone-200 font-medium mt-4 select-none">
                <p>
                    Não tem conta?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                    Cadastre-se
                    </Link>
                </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
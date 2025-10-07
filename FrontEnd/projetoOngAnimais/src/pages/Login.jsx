import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

function Login()
{
    const navigate = useNavigate(); //redirecionar rotas

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try
        {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
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
                navigate("/usuario");
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    };

    return (
        <div className="w-screen h-screen bg-slate-900 flex justify-center p-6">
            <div className="w-[500px] space-y-4">
                <h1 className="text-white text-xl font-semibold text-center mb-4">
                    Login no Sistema
                </h1>

                <div>
                    <Label>Email</Label>
                    <Input 
                        type="text" 
                        placeholder="Digite seu E-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Input>
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Input>
                </div>
                <Button onClick={handleLogin}>Entrar</Button>
            </div>
                <div className="mt-4 text-center">
                    <p style={{ marginTop: 10 }}>Não tem conta? <Link to="/register">Cadastra-se</Link></p>
                </div>
        </div>
    );
}

export default Login;
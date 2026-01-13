import { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { ArrowLeftToLine  } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ForgotPassword()
{
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try
        {
            const response = await fetch("http://localhost:3000/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email}),
            });

            const data = await response.json();

            if(!response.ok)
            {
                setError(data.error || "Erro ao enviar e-mail.");
                return;
            }

            setMessage("E-mail enviado! Verifique sua caixa de entrada.");
            setError("");
        }
        catch(err)
        {
            setError("Erro de conexão com o servidor.");
            console.log("Message erro: ", err);
        }
    }

    return (
        <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
            <div className="w-[400px] bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
                <button onClick={() => navigate("/")}
                    className="absolute left-8 top-10"
                >
                    <ArrowLeftToLine 
                        className="text-slate-800 hover:text-blue-600" 
                        size={25} 
                    />
                </button>

                <h1 className="text-slate-800 text-2xl font-bold text-center">
                    Recuperar Senha
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                    <div>
                        <Label>E-mail</Label>
                        <Input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-center"> {error} </p>}
                    {message && <p className="text-green-600 text-center"> {message} </p>}

                    <Button className="mt-10" type="submit">Enviar E-mail</Button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
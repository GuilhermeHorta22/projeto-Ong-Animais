import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

function ResetPassword()
{
    const navigate = useNavigate();

    const {token} = useParams();

    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(senha !== confirmSenha)
        {
            setError("As senhas precisam ser iguais!");
            return;
        }

        try
        {
            const response = await fetch(`http://localhost:3000/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ novaSenha: senha })
            });

            const data = await response.json();

            if(!response.ok)
            {
                setError(data.error || "Erro ao redefinir a senha.");
                return;
            }

            setMessage("Senha redefinida com sucesso!");
            setTimeout(() => navigate("/"), 2000); //time de 2 segundos para aparecer a mensagem de sucesso.
        }
        catch(err)
        {
            setError("Erro de conexão com o servidor.");
            console.log("Mensagem de erro: ", err);
        }
    }

    return (
        <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
            <div className="w-[400px] bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-slate-800 text-2xl font-bold text-center">
                    Redefinir Nova Senha
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Nova senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Confirmar senha</Label>
                        <Input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmSenha}
                            onChange={(e) => setConfirmSenha(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {message && <p className="text-green-600 text-center">{message}</p>}

                    <div className="flex justify-center gap-4 mt-4">
                        <Button type="submit" className="bg-green-700 hover:bg-green-800">
                            Confirmar
                        </Button>

                        <Button onClick={() => navigate("/")} className="bg-red-700 hover:bg-red-800">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
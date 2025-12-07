import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Sidebar from "../components/Sidebar";
import { cpfFormatter } from "../utils/formatters/cpfFormatter";
import { telefoneFormatter } from "../utils/formatters/telefoneFormatter";
import { CornerUpLeft } from "lucide-react";


function Register()
{
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const tipoUsuario = localStorage.getItem("tipo");

    const limparFormulario = () => {
        setNome("");
        setCpf("");
        setTelefone("");
        setEndereco("");
        setEmail("");
        setSenha("");
        setTipo();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        //para ter o estado do nosso usuario
        const tipoFinal = tipoUsuario === "ADMIN" ? "ADMIN" : "ADOTANTE";

        //validacao se o usuario preencheu todos os campos
        if(!nome || !cpf || !telefone || !endereco || !email || !senha || !tipoFinal)
        {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        try
        {
            const response = await fetch("http://localhost:3000/usuarios/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, telefone, endereco, email, senha, tipo: tipoFinal }),
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
                    setError("Erro ao cadastrar usuário.");
                return;
            }

            setSuccess("Usuário cadastrado com sucesso!");
            limparFormulario();
            if(tipoUsuario === "ADMIN")
                setTimeout(() => navigate("/admin"), 2000);
            else
                setTimeout(() => navigate("/"), 2000);//redireciona para a tela de login apos 2seg 
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    }

     //renderizando a pagina de cadastro
     return (
        <div className="flex">
            {tipoUsuario === "ADMIN" && (
                <Sidebar />
            )}

            <div className="flex-1 p-8 bg-slate-300 min-h-screen flex justify-center items-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister(e);
                    }}
                    className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
                >
                    <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                        {tipoUsuario === "ADMIN" ? "Cadastro Administrador" : "Cadastro Usuário"}
                    </h1>

                    <div className="flex flex-col gap-4">
                        <Label className="text-slate-800">Nome</Label>
                        <Input 
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            maxLength="30"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        <Label className="text-slate-800">Cpf</Label>
                        <Input 
                            type="text"
                            placeholder="CPF"
                            value={cpfFormatter(cpf)}
                            onChange={(e) => setCpf(e.target.value)}
                            maxLength="14"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        <Label className="text-slate-800">Telefone</Label>
                        <Input
                            type="text"
                            placeholder="Telefone"
                            value={telefoneFormatter(telefone)}
                            onChange={(e) => setTelefone(e.target.value)}
                            maxLength="15"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        <Label className="text-slate-800">Endereço</Label>
                        <Input 
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            maxLengh="35"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        <Label className="text-slate-800">E-mail</Label>
                        <Input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength="30"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        <Label className="text-slate-800">Senha</Label>
                        <Input 
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            maxLength="15"
                            className="border border-slate-400 rounded-lg p-2"
                        />

                        {tipoUsuario === "ADMIN" && (
                            <div>
                                <Label className="text-slate-800">Tipo</Label>
                                <Select value={tipo} onChange={(e) => setTipo(e.target.value)} >
                                    <option value="ADMIN">Administrador</option>
                                </Select>
                            </div>
                        )}

                        { error && <p className="text-red-700">{error}</p> }
                        { success && <p className="text-green-700">{success}</p> }

                        <div className="flex justify-center gap-4 mt-4">
                            <Button type="submit" className="bg-green-700 hover:bg-green-800">
                                Cadastrar
                            </Button>
                            <Button onClick={() => navigate("/admin")}
                                className="bg-red-700 hover:bg-red-800"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
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
    const [sucess, setSucess] = useState("");

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
        setSucess("");

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

            setSucess("Usuário cadastrado com sucesso!");
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
        <div className="w-screen h-screen bg-slate-300 flex justify-center items-center p-6">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRegister(e);
                }}>
                <div className="w-[450px] bg-slate-800 rounded-xl shadow-lg p-8 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        {tipoUsuario === "ADMIN" && (
                            <button 
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="text-white hover:text-blue-400 transition-colors"
                            >
                                <CornerUpLeft size={24} />
                            </button>
                        )}
                        <h1 className="text-white text-2xl font-semibold flex-1 text-center">
                            Cadastro de Usuário
                        </h1>
                        <div className="w-6"></div> {/* Espaçador para manter o título centralizado */}
                    </div>

                    <div>
                        <Label>Nome</Label>
                        <Input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>CPF</Label>
                        <Input
                        type="text"
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChange={(e) => setCpf(cpfFormatter(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Telefone</Label>
                        <Input
                        type="text"
                        placeholder="Digite seu telefone"
                        value={telefone}
                        maxLength={15}
                        onChange={(e) => setTelefone(telefoneFormatter(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Endereco</Label>
                        <Input
                        type="text"
                        placeholder="Digite seu endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {tipoUsuario === "ADMIN" && (
                        <div>
                            <Label>Tipo</Label>
                            <Select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="ADMIN">Admin</option>
                            </Select>
                        </div>  
                    )}

                    <div>
                        <Label>Senha</Label>
                        <Input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {sucess && <p className="text-green-400 text-center">{sucess}</p>}

                    <div className="flex justify-center mt-4">
                        <Button type="submit">Cadastrar</Button>
                    </div>

                    {tipoUsuario !== "ADMIN" && (
                        <div className="text-center text-stone-50 mt-4">
                            <p>
                                Já tem conta?{" "}
                                <Link to="/" className="text-blue-400 underline">
                                    Fazer Login
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
     );
}

export default Register;
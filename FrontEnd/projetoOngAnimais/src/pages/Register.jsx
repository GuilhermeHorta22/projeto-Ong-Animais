import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { formatCpf } from "../validation/cpf";
import { formatTelefone } from "../validation/telefone";


function Register()
{
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("ADOTANTE");
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");

    const handleRegister = async () => {
        setError("");
        setSucess("");
        setTipo("");

        //validacao se o usuario preencheu todos os campos
        if(!nome || !cpf || !telefone || !endereco || !email || !senha)
        {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        try
        {
            const response = await fetch("http://localhost:3000/usuarios/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, cpf, telefone, endereco, email, senha, tipo }),    
            });

            const data = await response.json();

            if(!response.ok)
            {
                setError(data.error || "Erro ao cadastrar usuário.");
                return;
            }

            setSucess("Usuário cadastrado com sucesso!");
            setTimeout(() => navigate("/"), 2000); //redireciona para a tela de login apos 2seg
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    }

     //renderizando a pagina de cadastro
     return (
        <div className="w-screen h-screen bg-stone-200 flex justify-center items-center p-6">
            <div className="w-[450px] bg-slate-800 rounded-xl shadow-lg p-8 space-y-4">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Cadastro de Usuário</h1>

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
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    />
                </div>

                <div>
                    <Label>Telefone</Label>
                    <Input
                    type="text"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(formatTelefone(e.target.value))}
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
                    <Button onClick={handleRegister}>Cadastrar</Button>
                </div>

                <div className="text-center text-stone-50 mt-4">
                    <p>
                        Já tem conta?{" "}
                        <Link to="/" className="text-blue-400 underline">
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default Register;
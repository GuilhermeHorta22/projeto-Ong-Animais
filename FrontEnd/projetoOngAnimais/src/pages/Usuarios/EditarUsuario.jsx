import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";
import { textFormatter } from "../../utils/formatters/textFormatter";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { telefoneFormatter } from "../../utils/formatters/telefoneFormatter";
import { cpfFormatter } from "../../utils/formatters/cpfFormatter";

function EditarUsuario()
{
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        endereco: "",
        email: "",
        senha: "",
        tipo: ""
    });

    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");

    //recuperando os dados do usuario
    useEffect(() => {
        if(isAuthorized === true && id)
        {
            const fetchUsuario = async () => {
                try
                {
                    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setUsuario(data);
                }
                catch(err)
                {
                    console.log("Erro ao buscar usuário: ", err);
                    setError("Erro ao buscar usuário.");
                }
            };
            fetchUsuario();
        }
    }, [isAuthorized, id, token]);

    if(isAuthorized !== true)
        return null;

    //pegando alteracoes
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({...prev, [name]: value}));
    }

    //realizando update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();
            if(!response.ok)
            {
                setError(data.error || "Erro ao atualizar os dados do usuário.");
                return;
            }

            setSuccess("Dados da pessoa atualizado com sucesso.");
            setTimeout(() => navigate("/admin/usuarios"), 2500); //leva de volta para sala de relatorio de usuario
        }
        catch(err)
        {
            console.log("Erro ao alterar dados do usuário: ", err);
            setError("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="p-8 bg-slate-300 min-h-screen flex justify-center items-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Editar Usuário
                </h1>

                <div className="flex flex-col gap-4">
                    <Label className="text-slate-800">Nome</Label>
                    <Input
                        type="text"
                        name="nome"
                        value={textFormatter(usuario.nome)}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Cpf</Label>
                    <Input
                        type="text"
                        name="cpf"
                        value={cpfFormatter(usuario.cpf)}
                        onChange={handleChange}
                        placeholder="Cpf"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Telefone</Label>
                    <Input 
                        type="text"
                        name="telefone"
                        value={telefoneFormatter(usuario.telefone)}
                        onChange={handleChange}
                        placeholder="Telefone"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Endereço</Label>
                    <Input
                        type="text"
                        name="endereco"
                        value={textFormatter(usuario.endereco)}
                        onChange={handleChange}
                        placeholder="Endereço"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Email</Label>
                    <Input 
                        type="text"
                        name="e-mail"
                        value={usuario.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Tipo</Label>
                    <Select name="tipo" value={usuario.tipo} onChange={handleChange}
                        className="border border-slate-400 rounded-lg p-2"
                    >
                        <option value="">Selecione</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="ADOTANTE">Adotante</option>
                    </Select>
                        
                    { error && <p className="text-red-700">{error}</p> }
                    { success && <p className="text-green-700">{success}</p> }

                    <div className="flex justify-center gap-4 mt-4">
                        <Button onClick={handleSubmit} 
                            className="bg-green-700 hover:bg-green-800">Salvar</Button>
                        <Button onClick={() => navigate("/admin/usuarios")}
                            className="bg-red-700 hover:bg-red-800">Cancelar</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarUsuario;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";

function EditarAnimal()
{
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal] = useState({
        nome: "",
        especie: "",
        raca: "",
        idade: 0,
        porte: "",
        descricao: "",
        status: "",
        foto: null,
    });

    const token = localStorage.getItem("token");
    const tipoUsuario = localStorage.getItem("tipo");
    const isAuthorized = useAuthGuard(tipoUsuario);

    useEffect(() => {
        if(isAuthorized === true && tipoUsuario === "ADMIN" && id)
        {
            const fetchAnimal = async () => {
                try
                {
                    const response = await fetch(`http://localhost:3000/animais/${id}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setAnimal(data);
                }
                catch(err)
                {
                    console.log("Erro ao buscar animal: ",err);
                }
            };
            fetchAnimal();
        }
    },[id]);

    if(isAuthorized === false || tipoUsuario !== "ADMIN")
        return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimal((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const response = await fetch(`http://localhost:3000/animais/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(animal),
            });

            const data = response.json();
            if(!response.ok)
            {
                setError(data.error || "Erro ao atualizar os dados do animal.");
                return;
            }

            setSuccess("Dados do animal atualizado com sucesso.");
            setTimeout(() => navigate("/admin"), 2500);
        }
        catch(err)
        {
            console.log("Erro ao alterar dados: ",err);
            setError("Erro de conexão com o servidor.");
        }
    };

    return (
        <div className="p-8 bg-slate-300 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Editar Animal
                </h1>

                <div className="flex flex-col gap-4">
                    <Label className="text-slate-800">Nome</Label>
                    <Input 
                        type="text"
                        name="nome"
                        value={animal.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Espécie</Label>
                    <Input 
                        type="text"
                        name="especie"
                        value={animal.especie}
                        onChange={handleChange}
                        placeholder="Espécie"
                        className="border border-slate-400 rounded-lg p-2"
                    />
                    
                    <Label className="text-slate-800">Raça</Label>
                    <Input 
                        type="text"
                        name="raca"
                        value={animal.raca}
                        onChange={handleChange}
                        placeholder="Raça"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Idade</Label>
                    <Input 
                        type="number"
                        name="idade"
                        value={animal.idade}
                        onChange={handleChange}
                        placeholder="Idade"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Porte</Label>
                    <Input 
                        type="text"
                        name="porte"
                        value={animal.porte}
                        onChange={handleChange}
                        placeholder="Porte"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Descrição</Label>
                    <textarea
                        name="descricao"
                        value={animal.descricao}
                        onChange={handleChange}
                        placeholder="Descrição"
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Status</Label>
                    <Select 
                        name="status" 
                        value={animal.status} onChange={handleChange}
                        className="border border-slate-400 rounded-lg p-2"
                    >
                        <option value="">Selecione...</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Indisponível">Indisponível</option>
                    </Select>

                    { error && <p className="text-red-500">{error}</p> }
                    { success && <p className="text-green-500">{success}</p> }

                    <div className="flex justify-center gap-4 mt-4">
                        <Button onClick={handleSubmit}>Salvar</Button>
                        <Button
                            onClick={() => navigate("/admin")}
                            className="bg-red-600 hover:bg-red-800 text-white rounded-lg px-4 py-2"
                        >
                            Cancelar
                        </Button>
                    </div>
                    
                </div>
            </form>
        </div>
    );
}

export default EditarAnimal;
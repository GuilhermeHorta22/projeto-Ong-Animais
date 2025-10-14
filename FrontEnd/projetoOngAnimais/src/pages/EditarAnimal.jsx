import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";

function EditarAnimal()
{
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

     useEffect(() => {
        const fetchAnimal = async () => {
            try
            {
                const response = await fetch(`http://localhost:3000/animais/${id}`);
                const data = await response.json();
                setAnimal(data);
            }
            catch(err)
            {
                console.log("Erro ao buscar animal: ",err);
            }
        };
        fetchAnimal();
     },[id]);

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(animal),
            });

            if(!response.ok)
                alert("Erro ao atualizar os dados do animal!");

            alert("Dados do animal atualizado com sucesso!");
            navigate("/admin");
        }
        catch(err)
        {
            console.log("Erro ao alterar dados: ",err);
        }
    };

    return (
        <div className="p-8 bg-stone-100 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold text-slate-800 mb-4">
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

                    <Button onClick={handleSubmit}>Salvar</Button>
                </div>
            </form>
        </div>
    );
}

export default EditarAnimal;
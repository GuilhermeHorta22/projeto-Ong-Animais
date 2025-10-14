import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Edit, Eye } from "lucide-react";

function AnimaisPage({ modo = "adotante" }) 
{
    const [animais, setAnimais] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        const fetchAnimais = async () => {
            try 
            {
                const response = await fetch("http://localhost:3000/animais/");
                const data = await response.json();
                setAnimais(data);
            } 
            catch(err) 
            {
                console.log("Erro ao buscar animais:", err);
            }
        };
        fetchAnimais();
    }, []);

    return (
        <div className="p-8 bg-stone-100 min-h-screen">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            {modo === "admin" ? "Gerenciamento de Animais" : "Animais Disponíveis para Adoção"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {animais.map((animal) => (
            <div
                key={animal.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col"
            >
                <img
                src={`http://localhost:3000/uploads/${animal.foto_url}`}
                alt={animal.nome}
                className="w-full h-52 object-cover"
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-1">{animal.nome}</h2>
                    <p className="text-sm text-slate-500">{animal.especie} • {animal.raca}</p>
                    <p className="text-sm text-slate-500">Idade: {animal.idade} anos</p>
                    <p className="text-sm text-slate-500">Porte: {animal.porte}</p>
                    <p
                    className={`text-sm font-medium mt-1 ${
                        animal.status === "Disponível"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    >
                    {animal.status}
                    </p>
                </div>

                <div className="mt-4 flex justify-between gap-2">
                    {modo === "admin" ? (
                    <>
                        <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
                        onClick={() => console.log("Editar", animal.id)}
                        >
                        <Edit size={16} /> Editar
                        </Button>

                        <Button
                        className="flex-1 bg-slate-700 hover:bg-slate-800 text-white flex items-center justify-center gap-1"
                        onClick={() => setSelectedAnimal(animal)}
                        >
                        <Eye size={16} /> Detalhes
                        </Button>
                    </>
                    ) : (
                    <Button
                        className="w-full bg-slate-700 hover:bg-slate-800 text-white flex items-center justify-center gap-1"
                        onClick={() => setSelectedAnimal(animal)}
                    >
                        <Eye size={16} /> Ver detalhes
                    </Button>
                    )}
                </div>
                </div>
            </div>
            ))}
        </div>

        {selectedAnimal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
                <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl font-bold"
                >
                ×
                </button>

                <img
                src={selectedAnimal.foto_url || "/placeholder.jpg"}
                alt={selectedAnimal.nome}
                className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedAnimal.nome}</h2>
                <p className="text-slate-600"><strong>Espécie:</strong> {selectedAnimal.especie}</p>
                <p className="text-slate-600"><strong>Raça:</strong> {selectedAnimal.raca}</p>
                <p className="text-slate-600"><strong>Idade:</strong> {selectedAnimal.idade} anos</p>
                <p className="text-slate-600"><strong>Porte:</strong> {selectedAnimal.porte}</p>
                <p className="text-slate-600"><strong>Status:</strong> {selectedAnimal.status}</p>
                <p className="text-slate-600 mt-2"><strong>Descrição:</strong> {selectedAnimal.descricao}</p>
            </div>
            </div>
        )}
        </div>
    );
}

export default AnimaisPage;
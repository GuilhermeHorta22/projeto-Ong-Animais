import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

function CadastroAnimal ()
{
    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [idade, setIdade] = useState(0); //0 porque é int
    const [porte, setPorte] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");
    const [foto, setFoto] = useState(null); //null porque é arquivo
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCadastrarAnimal = async () => {
        setError("");
        setSuccess("");

        if(!nome || !especie || !raca || !idade || !porte || !descricao || !status || !foto)
        {
            setError("Preencha todos os campos!");
            return;
        }

        try
        {
            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("especie", especie);
            formData.append("raca", raca);
            formData.append("idade", idade);
            formData.append("porte", porte);
            formData.append("descricao", descricao);
            formData.append("status", status);
            formData.append("foto", foto);

            const response = await fetch("http://localhost:3000/animais/", {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if(!response.ok)
            {
                setError(data.error || "Erro ao cadastrar o animal.");
                return;
            }

            setSuccess("Animal cadastrado com sucesso!");

            //limpando os campos
            setNome("");
            setEspecie("");
            setRaca("");
            setDescricao("");
            setIdade(0);
            setPorte("");
            setStatus("");
            setFoto(null);
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-md">
            <h1 className="text-white text-xl font-semibold text-center mb-4">Cadastro de Animal</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

            
        </div>
    );
}

export default CadastroAnimal;
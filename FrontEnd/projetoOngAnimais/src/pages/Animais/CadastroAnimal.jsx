import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";

function CadastroAnimal ()
{
    const navigate = useNavigate();

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

    const token = localStorage.getItem("token");

    const isAuthorized = useAuthGuard("ADMIN");
    if(isAuthorized === false)
        return null;

    const handleCadastrarAnimal = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!nome || !especie || !raca || idade === "" || !porte || !descricao || !status || !foto)
        {
            setError("Preencha todos os campos!");
            return;
        }

        if(isNaN(idade))
        {
            setError("O campo idade deve ser um número.");
            return;
        }
        if(idade < 0 )
        {
            setError("O campo idade deve ser maior ou igual a 0.");
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
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
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
                    setError("Erro ao cadastrar o animal.");
                return;
            }

            //limpando os campos
            setNome("");
            setEspecie("");
            setRaca("");
            setDescricao("");
            setIdade(0);
            setPorte("");
            setStatus("");
            setFoto(null);

            setSuccess("Animal cadastrado com sucesso!");
            setTimeout(() => navigate("/admin"), 2500); //volta para a pagina de animais de 2,5 seg
        }
        catch(error)
        {
            console.log("Message error: ", error);
            setError("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="p-8 bg-slate-300 min-h-screen flex justify-center items-center">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCadastrarAnimal(e);
                }}
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">Cadastro de Animal</h1>

                <div className="flex flex-col gap-4">
                    <Label className="text-slate-800">Nome</Label>
                    <Input
                        type="text"
                        placeholder="Nome do animal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Espécie</Label>
                    <Select value={especie} onChange={(e) => setEspecie(e.target.value)} className="border border-slate-400 rounded-lg p-2">
                        <option value="">Selecione...</option>
                        <option value="cachorro">Cachorro</option>
                        <option value="gato">Gato</option>
                    </Select>

                    <Label className="text-slate-800">Raça</Label>
                    <Input 
                        type="text"
                        placeholder="Raça do animal"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Idade</Label>
                    <Input 
                        type="number"
                        placeholder="Idade do animal"
                        value={idade}
                        onChange={(e) => setIdade(parseInt(e.target.value))}
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Porte</Label>
                    <Select value={porte} onChange={(e) => setPorte(e.target.value)} className="border border-slate-400 rounded-lg p-2">
                        <option value="">Selecione...</option>
                        <option value="pequeno">Pequeno</option>
                        <option value="medio">Médio</option>
                        <option value="grande">Grande</option>
                    </Select>

                    <Label className="text-slate-800">Descrição</Label>
                    <textarea
                        name="descricao"
                        placeholder="Descrição animal"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border border-slate-400 rounded-lg p-2"
                    />

                    <Label className="text-slate-800">Status</Label>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-slate-400 rounded-lg p-2">
                        <option value="">Selecione...</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Indisponível">Indisponível</option>
                    </Select>

                    <Label className="text-slate-800">Foto</Label>
                    <label
                        htmlFor="foto"
                        className="flex items-center  justify-between bg-stone-100 rounded-md p-2 cursor-pointer hover:bg-slate-300 transition border border-slate-400"
                    >
                        <span className="text-slate-700 font-medium ">
                            {foto ? foto.name : "Escolher imagem..."}
                        </span>

                        <span className="bg-slate-500 text-white text-sm px-3 py-1 rounded-md cursor-pointer hover:bg-slate-700">
                            Procurar
                        </span>

                        <input
                            id="foto"
                            type="file"
                            accept="image/*"
                            className="hidden border-slate-800"
                            onChange={(e) => setFoto(e.target.files[0])}
                        />
                    </label>

                    {error && <p className="text-red-700">{error}</p>}
                    {success && <p className="text-green-700 mb-2">{success}</p>}

                    <div className="flex justify-center gap-4 mt-4">
                        <Button type="submit"
                            className="bg-green-700 hover:bg-green-800">Cadastrar</Button>
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

export default CadastroAnimal;
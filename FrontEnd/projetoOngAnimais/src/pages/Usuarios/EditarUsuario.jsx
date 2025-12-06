import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

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
            const response = await fetch(`http://localhost/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(usuario);
            });

            const data = response.json();
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
            setError("Erro de conexão com o servidor");
        }
    }

    return (
        <div>
            <h1>Editar usuário</h1>
        </div>
    );
}

export default EditarUsuario;
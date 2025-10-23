import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Trash, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  { useAuthGuard } from "../../validation/useAuthGuard";

function usuariosRelatorio()
{
    const [usuarios, setUsuarios] = useState([]); //vamos usar para listar os usuarios
    const [selectedUsuario, setSelectedUsuario] = useState(null); //vamos usar para editar
    const [modalAberto, setModalAberto] = useState(false); //vamos usar para ter controle do modal de exclusao
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //validacao de token
    const token = localStorage.getItem("token");
    const isAuthorized = useAuthGuard("ADMIN");
    if(isAuthorized === false)
        return null;

    

    return(
        <div>
            <h1>
                Relatorio de Usuarios
            </h1>
        </div>
    );
}

export default usuariosRelatorio;
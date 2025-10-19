import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (tipoPermitido: "ADMIN" | "ADOTANTE") => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tipo = localStorage.getItem("tipo");

        if(!token) 
        {
            setIsAuthorized(false);
            navigate("/");
            return;
        }

        if(tipo !== "ADMIN" && tipo !== "ADOTANTE") 
        {
            setIsAuthorized(false);
            navigate("/");
            return;
        }

        if(tipoPermitido !== tipo) 
        {
            setIsAuthorized(false);
            navigate("/");
            return;
        }

        setIsAuthorized(true);
    }, [tipoPermitido]);

    return isAuthorized;
};
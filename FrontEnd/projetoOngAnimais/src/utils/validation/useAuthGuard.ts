import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (...tiposPermitido: ("ADMIN" | "ADOTANTE")[]) => {
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

        if(!tiposPermitido.includes(tipo as "ADMIN" | "ADOTANTE")) 
        {
            setIsAuthorized(false);
            navigate("/");
            return;
        }
        setIsAuthorized(true);
    }, [tiposPermitido, navigate]);

    return isAuthorized;
};
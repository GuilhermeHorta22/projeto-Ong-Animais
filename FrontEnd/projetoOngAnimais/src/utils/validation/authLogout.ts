import { NavigateFunction } from "react-router-dom";

export const authLogout =(navigate: NavigateFunction): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");

    if(navigate)
        navigate("/");

    window.location.reload();
}
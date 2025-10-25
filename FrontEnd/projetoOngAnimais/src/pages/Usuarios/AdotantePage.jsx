import { Outlet } from "react-router-dom";
import AnimaisPage from "../Animais/AnimaisPage";
import Sidebar from "../../components/Sidebar";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";

function AdotantePage()
{
    const isAuthorized = useAuthGuard("ADOTANTE");

    if(isAuthorized === false)
        return null;

    return (
        <div className="flex">
            <Sidebar />
                <div className="flex-1 bg-slate-300 min-h-screen p-6">
                    <Outlet />
                </div>
        </div>
    );
}

export default AdotantePage;
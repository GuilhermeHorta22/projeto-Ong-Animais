import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Edit3, Info } from 'lucide-react';
import AnimaisPage from "../Animais/AnimaisPage";
import { useAuthGuard } from "../../utils/validation/useAuthGuard";

function AdminPage()
{
    const isAuthorized = useAuthGuard("ADMIN");

    //volta para a pagina porque não tem autorização
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

export default AdminPage;
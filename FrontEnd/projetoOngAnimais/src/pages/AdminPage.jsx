import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Edit3, Info } from 'lucide-react';
import AnimaisPage from "./AnimaisPage";

function AdminPage()
{
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-stone-100 min-h-screen p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPage;
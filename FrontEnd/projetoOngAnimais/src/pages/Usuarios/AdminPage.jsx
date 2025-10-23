import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Edit3, Info } from 'lucide-react';
import AnimaisPage from "../Animais/AnimaisPage";
import { useAuthGuard } from "../../validation/useAuthGuard";
import { useState, useEffect } from "react";

function AdminPage()
{
    const isAuthorized = useAuthGuard("ADMIN");

    //se a pessoa nao tiver autorizacao mantem na pagina atual
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
import { Link, useLocation } from "react-router-dom";
import Label from "./Label";
import { Home, PawPrint, User, FileText } from "lucide-react";

function Sidebar()
{
    const location = useLocation();

    const menuItems = [
        { label: "home", path:"/admin", icon: <Home size={20} />},
        { label: "Cadastrar Animais", path:"/admin/cadastrar-animal", icon: <PawPrint size={20} />},
        { label: "Relatório de Usuários", path:"/admin/usuarios", icon: <User size={20} />},
        { label: "Relatório de Animais", path:"/admin/animais", icon: <FileText size={20} />},
    ];

    return(
        <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-200 tracking-wide">Painel Administrador</h2>
           
           <nav className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3
                            ${
                                location.pathname === item.path
                                ? "bg-slate-700 text-white shadow-md"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
           </nav>

           <div className="mt-auto pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} ONG ANIMAIS
           </div>
        </div>
    );
}

export default Sidebar;
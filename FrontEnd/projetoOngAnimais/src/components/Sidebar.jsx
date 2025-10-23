import { Link, useLocation } from "react-router-dom";
import Label from "./Label";
import { Home, PawPrint, User, Dog, FileSearch, LogOut } from "lucide-react";

function Sidebar()
{
    const location = useLocation();

    const tipoUsuario = localStorage.getItem("tipo"); //admin

    const menuItemsAdmin = [
        { label: "home", path: "/admin", icon: Home },
        { label: "Cadastrar Animais", path: "/admin/cadastrar-animal", icon: PawPrint },
        { label: "Registrar Adoção", path: "/admin/registrar-adocao", icon: Dog },
        { label: "Relatório de Usuários", path: "/admin/usuarios", icon: User },
        { label: "Relatório de Adoções", path: "/admin/relatorio-adocao", icon: FileSearch },
        { label: "Sair", path: "/", icon: LogOut, color: "#FF0000" },
    ];

    const menuItemsAdotante = [
        { label: "home", path: "/adotante", icon: Home },
        { label: "Sair", path: "/", icon: LogOut, color: "#FF0000" },
    ];

    const menuItems = tipoUsuario === "ADMIN" ? menuItemsAdmin : menuItemsAdotante;

    return(
        <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-200 tracking-wide">
                {tipoUsuario === "ADMIN" ? "Painel Administrador" : "Painel Adotante"}
            </h2>
           
           <nav className="flex flex-col space-y-3 flex-grow overflow-y-auto">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            style={{ color: item.color || "" }}
                            className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3
                                ${
                                    location.pathname === item.path
                                    ? "bg-slate-700 text-white shadow-md"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                            <Icon 
                                size={20}
                                color={item.color || "currentColor"}
                            />
                            {item.label}
                        </Link>
                    );
                    
                })}
           </nav>

           <footer className="pt-6 border-t border-slate-700 text-center text-sm text-slate-500 mt-6 sm:mt-auto">
                © {new Date().getFullYear()} ONG ANIMAIS
           </footer>
        </aside>
    );
}

export default Sidebar;
import { Link } from "react-router-dom";

function Sidebar()
{
    return(
        <div className="w-64 h-screen bg-slate-900 text-white flex flex-col p-6 space-y-4">
            <h2 className="text-xl font-bold mb-6">Menu Administrador</h2>
            <Link
            to="/admin/cadastrar-animal"
            className="px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
                Cadastrar Animais
            </Link>

            <Link
            to="/admin/usuarios"
            className="px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
                Relatório de Usuários
            </Link>

            <Link
            to="/admin/animais"
            className="px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
                Relatório de Animais
            </Link>

            <Link
            to="/admin"
            className="px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
                Home
            </Link>
        </div>
    );
}

export default Sidebar;
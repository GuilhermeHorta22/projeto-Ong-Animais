import Input from './Input';
import Label from './Label';
import Button from './Button';
import { cpfFormatter } from '../utils/formatters/cpfFormatter';
import { telefoneFormatter } from '../utils/formatters/telefoneFormatter';

function ModalUsuarios({ isOpen, onClose, itemUser, errorMessage }) {
    if(!isOpen)
        return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Detalhes Do Usuário
                </h1>

                <div className="flex flex-col gap-4">
                    <Label className="text-slate-800">Nome</Label>
                    <Input 
                        type="text"
                        value={itemUser.nome}
                        placeholder="Nome"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />

                    <Label className="text-slate-800">Cpf</Label>
                    <Input
                        type="text"
                        value={cpfFormatter(itemUser.cpf)}
                        placeholder="Cpf"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />

                    <Label className="text-slate-800">Telefone</Label>
                    <Input
                        type="text"
                        value={telefoneFormatter(itemUser.telefone)}
                        placeholder="Telefone"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />

                    <Label className="text-slate-800">Endereço</Label>
                    <Input 
                        type="text"
                        value={itemUser.endereco}
                        placeholder="Endereço"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />

                    <Label className="text-slate-800">Email</Label>
                    <Input 
                        type="text"
                        value={itemUser.email}
                        placeholder="E-mail"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />

                    <Label className="text-slate-800">Tipo</Label>
                    <Input
                        type="text"
                        value={itemUser.tipo}
                        placeholder="Tipo"
                        className="border border-slate-400 rounded-lg p-2"
                        disabled
                    />
                </div>

                { errorMessage && <p className="text-red-700"> {errorMessage} </p>}
                <div className="flex justify-center gap-4 py-5">
                    <Button onClick={onClose}>
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default ModalUsuarios;
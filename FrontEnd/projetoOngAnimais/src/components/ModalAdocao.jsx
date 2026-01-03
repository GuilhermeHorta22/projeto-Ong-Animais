import Input from './Input';
import Label from './Label';
import Button from './Button';
import { cpfFormatter } from '../utils/formatters/cpfFormatter';
import { dataFormatter } from '../utils/formatters/dataFormatter';
import { textFormatter } from '../utils/formatters/textFormatter';
import { telefoneFormatter } from '../utils/formatters/telefoneFormatter';

function ModalAdocao({ isOpen, onClose, itemAdocao, errorMessage })
{
    if(!isOpen)
        return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    <div className="space-y-8 text-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                                Detalhes da adoção
                            </h1>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-slate-800">Código da adoção</Label>
                                    <Input
                                        type="text"
                                        value={itemAdocao.id}
                                        placeholder="Código da adoção"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />

                                    <Label className="text-slate-800 mt-5">Data da adoção</Label>
                                    <Input
                                        type="text"
                                        value={dataFormatter(itemAdocao.data)}
                                        placeholder="Data da adoção"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center mt-5">
                                Detalhes do adotante
                            </h1>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-slate-800">Nome do adotante</Label>
                                    <Input
                                        type="text"
                                        value={textFormatter(itemAdocao.usuario?.nome)}
                                        placeholder="Nome do adotante"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />

                                    <Label className="text-slate-800 mt-5">Cpf do adotante</Label>
                                    <Input
                                        type="text"
                                        value={cpfFormatter(itemAdocao.usuario?.cpf)}
                                        placeholder="Cpf do adotante"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />

                                    <Label className="text-slate-800 mt-5">Telefone do adotante</Label>
                                    <Input 
                                        type="text"
                                        value={telefoneFormatter(itemAdocao.usuario?.telefone)}
                                        placeholder="Telefone do adotante"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />

                                    <Label className="text-slate-800 mt-5">E-mail do adotante</Label>
                                    <Input 
                                        type="text"
                                        value={itemAdocao.usuario?.email}
                                        placeholder="E-mail do adotante"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />

                                    <Label className="text-slate-800 mt-5">Endereço do adotante</Label>
                                    <Input 
                                        type="text"
                                        value={itemAdocao.usuario?.endereco}
                                        placeholder="Endereço do adotante"
                                        className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                            Detalhes do animal
                        </h1>
                        
                        <div className="mb-6 flex justify-center">
                            <img 
                                src={`http://localhost:3000/uploads/${itemAdocao.animal.foto_url}`}
                                alt={itemAdocao.nome} 
                                className="w-50 h-50 object-cover rounded-xl shadow-lg mx-auto"
                            />
                        </div>
                        
                        <div className="space-y-4 text-center">
                            <div>
                                <Label className="text-slate-800 mt-5">Nome do animal</Label>
                                <Input 
                                    type="text"
                                    value={textFormatter(itemAdocao.animal?.nome)}
                                    placeholder="Nome do animal"
                                    className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                    disabled
                                />

                                <Label className="text-slate-800 mt-5">Espécie do animal</Label>
                                <Input 
                                    type="text"
                                    value={textFormatter(itemAdocao.animal?.especie)}
                                    placeholder="Espécie do animal"
                                    className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                    disabled
                                />

                                <Label className="text-slate-800 mt-5">Raça do animal</Label>
                                <Input 
                                    type="text"
                                    value={textFormatter(itemAdocao.animal?.raca)}
                                    placeholder="Raça do animal"
                                    className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                    disabled
                                />

                                <Label className="text-slate-800 mt-5">Porte do animal</Label>
                                <Input 
                                    type="text"
                                    value={textFormatter(itemAdocao.animal?.porte)}
                                    placeholder="Raça do animal"
                                    className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                    disabled
                                />

                                <Label className="text-slate-800 mt-5">Idade do animal</Label>
                                <Input 
                                    type="text"
                                    value={itemAdocao.animal?.idade}
                                    placeholder="Idade do animal"
                                    className="border border-slate-400 rounded-lg p-2 px-15 text-center"
                                    disabled
                                />
                            </div>
                        </div>

                    </div>

                </div>

                { errorMessage && <p className="text-red-700"> {errorMessage}</p>}
                <div className="flex justify-center gap-4 py-5">
                    <Button onClick={onClose}>
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalAdocao;
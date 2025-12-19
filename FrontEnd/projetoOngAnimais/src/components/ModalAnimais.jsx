import Button from './Button';
import { textFormatter } from './../utils/formatters/textFormatter'

function ModalAnimais( {isOpen, onClose, itemAnimais, errorMessage }) {
    if(!isOpen)
        return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Detalhes Do Animal
                </h1>

                <img 
                    src={`http://localhost:3000/uploads/${itemAnimais.foto_url}`} 
                    alt={itemAnimais.nome}
                    className="w-90 h-90 object-cover rounded-xl shadow-lg mx-auto"
                />
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2 mt-5 uppercase"> {itemAnimais.nome} </h2>
                <p className="text-slate-800 text-lg"><strong>Espécie:</strong> {textFormatter(itemAnimais.especie)} </p>
                <p className="text-slate-800 text-lg"><strong>Raça:</strong> {textFormatter(itemAnimais.raca)} </p>
                <p className="text-slate-800 text-lg"><strong>Idade:</strong> {itemAnimais.idade} </p>
                <p className="text-slate-800 text-lg"><strong>Porte:</strong> {textFormatter(itemAnimais.porte)} </p>
                <p className="text-slate-800 text-lg"><strong>Descrição:</strong> {textFormatter(itemAnimais.descricao)} </p>
                <p className="text-slate-800 text-lg"><strong>Status: </strong> 
                    <strong className={`${ itemAnimais.status === 'Disponível' ? "text-green-600" : "text-red-600"}`}>
                        {textFormatter(itemAnimais.status)}
                    </strong> 
                </p>

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

export default ModalAnimais;
import Button from "./Button";

function ModalDelete({ isOpen, onClose, itemName, onConfirm, errorMessage }) {
    if(!isOpen)
        return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
                <p className="mb-4 text-lg">
                    Deseja confirmar a exclusão de <strong>{itemName}</strong> ?
                </p>

                { errorMessage && <p className="text-red-500"> {errorMessage} </p>}

                <div className="flex justify-center gap-4 py-5">
                    <Button className="bg-green-700 hover:bg-green-800" onClick={onConfirm}>
                        Confirmar
                    </Button>
                    <Button className="bg-red-700 hover:bg-red-800" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete
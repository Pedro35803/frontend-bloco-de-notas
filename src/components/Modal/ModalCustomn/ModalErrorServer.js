import Button from "../../Button";
import Modal from "../Modal";

const ModalErrorServer = ({ callbackClose, isVisible }) => {
    return (
        <Modal isVisible={isVisible} callbackClose={callbackClose}>
            <div className="form rounded-lg w-[40rem]">
                <h1 className="text-2xl font-bold">Error de conecção</h1>
                <p className="text-lg">
                    Não é possível estabelecer uma conecção com o servidor,
                    verifique se o backend está ligado corretamente.
                </p>
                <div className="flex justify-end">
                    <Button isOutline={true} onClick={callbackClose}>
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalErrorServer;

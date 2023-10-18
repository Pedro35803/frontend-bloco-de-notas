import trashIcon from "../img/trash.svg";
import editIcon from "../img/edit.svg";
import { useState } from "react";

import Modal from "./Modal";
import ModalDelete from "./ModalDelete";

const Notepad = ({ data, callbackEdit, callbackDelete }) => {
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    return (
        <>
            <div className="bg-primary p-9 w-full rounded-lg shadow-common border border-solid border-[#e7e7e7]">
                <div className="flex justify-between align-center">
                    <h1 className="content-xl title">{data.title}</h1>
                    <div className="flex gap-4">
                        <img
                            src={trashIcon}
                            alt="Deletar"
                            className="h-6 cursor-pointer"
                        />
                        <img
                            src={editIcon}
                            alt="Editar"
                            className="h-6 cursor-pointer"
                        />
                    </div>
                </div>
                <p className="text-base mt-6 content">{data.content}</p>
            </div>
            <Modal
                isVisible={modalEditVisible}
                callbackSuccess={callbackEdit}
                callbackClose={() => setModalEditVisible(false)}
                titleValue={data.title}
                textValue={data.content}
            />
            <ModalDelete
                isVisible={modalDeleteVisible}
                callbackSuccess={callbackDelete}
                callbackClose={() => setModalDeleteVisible(false)}
            />
        </>
    );
};

export default Notepad;

import { useEffect, useState } from "react";

import circleIcon from "../img/plus-circle.svg";
import searchIcon from "../img/search.svg";

import Notepad from "../components/Notepad.js";
import { createNotepad, getAllNotepads } from "../services/crudNotepad.js";

import { useModal } from "../components/Modal/useModal.js";
import ModalFormComponent from "../components/Modal/ModalCustomn/ModalForm.js";
import ModalDeleteComponent from "../components/Modal/ModalCustomn/ModalDelete.js";

const Main = () => {
    const [listNotepads, setListNotepads] = useState([]);
    const [notepadId, setNotepadId] = useState(null);

    const {
        Modal: ModalDelete,
        openModal: openModalDelete,
        closeModal: closeModalDelete,
    } = useModal({ modal: ModalDeleteComponent });

    const { Modal: ModalForm, openModal: openModalForm } = useModal({
        modal: ModalFormComponent,
    });

    const classButtonLabel =
        "flex bg-primary min-w-[3.5rem] min-h-[3.5rem] rounded-lg p-[1.125rem] border border-solid border-[#e7e7e7] shadow-common ";

    const addNewNotepad = (newNotepad) => {
        setListNotepads([...listNotepads, newNotepad]);
    };

    const editNotepad = (notepad) => {
        const newList = listNotepads.map((obj) => {
            if (notepad.id === obj.id) {
                return notepad;
            }
            return obj;
        });
        setListNotepads(newList);
    };

    const deleteNotepad = (id) => {
        const listFilter = listNotepads.filter((obj) => obj.id !== id);
        setListNotepads(listFilter);
    };

    const getNotepad = (id) => {
        const notepad = listNotepads.find((obj) => obj.id === id);
        return notepad;
    };

    const notepadData = useEffect(() => {
        const main = async () => {
            const list = await getAllNotepads();
            setListNotepads(list);
        };
        main();
    }, []);

    return (
        <>
            <main className="p-[3.75rem] space-y-12">
                <section className="container flex flex-col-reverse sm:flex-row justify-center gap-8">
                    <label
                        className={
                            classButtonLabel +
                            "gap-2 cursor-text w-full sm:w-[25rem]"
                        }
                    >
                        <img
                            src={searchIcon}
                            placeholder="Pesquisar nota"
                            className="h-7 md:h-6 cursor-pointer"
                        />
                        <input
                            type="text"
                            id="input-search"
                            placeholder="Pesquisar nota"
                            className="bg-primary outline-0 pl-2 placeholder:text-secondary"
                        />
                    </label>

                    <button
                        className={
                            classButtonLabel +
                            "flex items-center gap-4 text-secondary p-[1.125rem] w-full sm:w-[25rem]"
                        }
                        onClick={openModalForm}
                        data-cy="add-notepad"
                    >
                        <img src={circleIcon} className="w-7 md:w-auto" />
                        <p>Adicionar</p>
                    </button>
                </section>

                <section className="container flex flex-col justify-between items-center gap-8">
                    {listNotepads.map((notepadObj, index) => (
                        <Notepad
                            key={index}
                            data={notepadObj}
                            callbackModalEdit={openModalDelete}
                            callbackModalDelete={closeModalDelete}
                            updateId={setNotepadId}
                        />
                    ))}
                </section>
            </main>
            <ModalForm
                callbackSuccess={addNewNotepad}
                callbackGetNotepad={getNotepad}
                callbackAction={createNotepad}
            />
            <ModalForm
                callbackSuccess={editNotepad}
                callbackGetNotepad={getNotepad}
                callbackAction={editNotepad}
                notepadId={notepadId}
            />
            <ModalDelete
                callbackSuccess={() => deleteNotepad(notepadData?.id)}
                callbackGetNotepad={getNotepad}
                callbackAction={deleteNotepad}
            />
        </>
    );
};

export default Main;

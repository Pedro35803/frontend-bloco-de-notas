import { useEffect, useState } from "react";

import circleIcon from "../img/plus-circle.svg";
import searchIcon from "../img/search.svg";

import Notepad from "../components/Notepad.js";
import {
    getAllNotepads,
    createNotepad,
    deleteNotepad,
    editNotepad,
} from "../services/crudNotepad.js";

import { useModal } from "../components/Modal/useModal.js";
import ModalFormComponent from "../components/Modal/ModalCustomn/ModalForm.js";
import ModalDeleteComponent from "../components/Modal/ModalCustomn/ModalDelete.js";
import Logout from "../components/Logout.js";

const Main = () => {
    const [listNotepads, setListNotepads] = useState([]);
    const [notepadId, setNotepadId] = useState(null);

    const { Modal: ModalDelete, openModal: openModalDelete } = useModal({
        modal: ModalDeleteComponent,
    });

    const { Modal: ModalFormCreate, openModal: openModalFormCreate } = useModal(
        {
            modal: ModalFormComponent,
        }
    );

    const { Modal: ModalFormEdit, openModal: openModalFormEdit } = useModal({
        modal: ModalFormComponent,
    });

    const classButtonLabel =
        "flex bg-primary min-w-[3.5rem] min-h-[3.5rem] rounded-lg p-[1.125rem] border border-solid border-[#e7e7e7] shadow-common ";

    const getNotepadInList = (id) => {
        const notepad = listNotepads.find((obj) => obj.id === id);
        return notepad;
    };

    const updateNotepadsInList = async () => {
        try {
            const list = await getAllNotepads();
            setListNotepads(list.map((obj) => ({ ...obj, isVisible: true })));
        } catch (e) {
            console.error(e);
        }
    };

    const searchElements = async (e) => {
        const text = e.target.value;
        const list = listNotepads.map((obj) => {
            const isInclude = obj.title.includes(text);
            return { ...obj, isVisible: isInclude };
        });
        setListNotepads(list);
    };

    useEffect(() => {
        updateNotepadsInList();
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
                            data-cy="search-notepad"
                            placeholder="Pesquisar nota"
                            className="bg-primary outline-0 pl-2 placeholder:text-secondary"
                            onChange={searchElements}
                        />
                    </label>

                    <button
                        className={
                            classButtonLabel +
                            "flex items-center gap-4 text-secondary p-[1.125rem] w-full sm:w-[25rem]"
                        }
                        onClick={openModalFormCreate}
                        data-cy="add-notepad"
                    >
                        <img src={circleIcon} className="w-7 md:w-auto" />
                        <p>Adicionar</p>
                    </button>
                </section>

                <section
                    data-cy="section-notepads"
                    className="container flex flex-1 flex-col justify-between items-center gap-8"
                >
                    {listNotepads.map(
                        (notepadObj, index) =>
                            notepadObj.isVisible && (
                                <Notepad
                                    key={index}
                                    data={notepadObj}
                                    callbackModalEdit={openModalFormEdit}
                                    callbackModalDelete={openModalDelete}
                                    updateId={setNotepadId}
                                />
                            )
                    )}
                </section>

                <Logout />
            </main>
            <ModalFormCreate
                callbackSuccess={updateNotepadsInList}
                callbackGetNotepad={getNotepadInList}
                callbackAction={createNotepad}
            />
            <ModalFormEdit
                callbackSuccess={updateNotepadsInList}
                callbackAction={editNotepad}
                notepad={getNotepadInList(notepadId)}
            />
            <ModalDelete
                callbackSuccess={updateNotepadsInList}
                callbackAction={deleteNotepad}
                notepadId={notepadId}
            />
        </>
    );
};

export default Main;

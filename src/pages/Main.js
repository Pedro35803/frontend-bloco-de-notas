import { useEffect, useState } from "react";

import circleIcon from "../img/plus-circle.svg";
import searchIcon from "../img/search.svg";

import Notepad from "../components/Notepad.js";
import Modal from "../components/Modal";
import { getAllNotepads } from "../services/crudNotepad.js";

const Main = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [listNotepads, setListNotepads] = useState([]);
    const classButtonLabel =
        "flex bg-primary min-w-[3.5rem] min-h-[3.5rem] rounded-lg p-[1.125rem] border border-solid border-[#e7e7e7] shadow-common ";

    const modalClose = () => setModalVisible(false);

    const addNewNotepad = (newNotepad) => {
        setListNotepads([...listNotepads, newNotepad]);
    }

    useEffect(() => {
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
                        onClick={() => setModalVisible(true)}
                    >
                        <img src={circleIcon} className="w-7 md:w-auto" />
                        <p>Adicionar</p>
                    </button>
                </section>

                <section className="container flex flex-col justify-between items-center gap-8">
                    {listNotepads.map((notepadObj, index) => (
                        <Notepad data={notepadObj} key={index} />
                    ))}
                </section>
            </main>
            <Modal
                isVisible={modalVisible}
                callbackClose={modalClose}
                addNotepad={addNewNotepad}
            />
        </>
    );
};

export default Main;

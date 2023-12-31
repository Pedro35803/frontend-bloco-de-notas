import trashIcon from "../img/trash.svg";
import editIcon from "../img/edit.svg";

const Notepad = ({
    data,
    updateId,
    callbackModalEdit,
    callbackModalDelete,
}) => {
    return (
        <>
            <div data-cy="notepad" className="bg-primary p-8 w-full rounded-lg shadow-common border border-solid border-[#e7e7e7]">
                <div className="flex justify-between align-center">
                    <h1 className="content-xl title text-2xl" data-cy="notepad-title">{data.title}</h1>
                    <div className="flex gap-4">
                        <img
                            src={trashIcon}
                            alt="Deletar"
                            className="h-6 cursor-pointer"
                            data-cy="notepad-edit"
                            onClick={() => {
                                updateId(data.id);
                                callbackModalDelete(true);
                            }}
                        />
                        <img
                            src={editIcon}
                            alt="Editar"
                            className="h-6 cursor-pointer"
                            data-cy="notepad-delete"
                            onClick={() => {
                                updateId(data.id);
                                callbackModalEdit(true);
                            }}
                        />
                    </div>
                </div>
                <p className="text-base mt-4 content" data-cy="notepad-content">{data.content}</p>
            </div>
        </>
    );
};

export default Notepad;

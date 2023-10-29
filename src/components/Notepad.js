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
            <div className="bg-primary p-9 w-full rounded-lg shadow-common border border-solid border-[#e7e7e7]">
                <div className="flex justify-between align-center">
                    <h1 className="content-xl title">{data.title}</h1>
                    <div className="flex gap-4">
                        <img
                            src={trashIcon}
                            alt="Deletar"
                            className="h-6 cursor-pointer"
                            onClick={() => {
                                updateId(data.id);
                                callbackModalDelete(true);
                            }}
                        />
                        <img
                            src={editIcon}
                            alt="Editar"
                            className="h-6 cursor-pointer"
                            onClick={() => {
                                updateId(data.id);
                                callbackModalEdit(true);
                            }}
                        />
                    </div>
                </div>
                <p className="text-base mt-6 content">{data.content}</p>
            </div>
        </>
    );
};

export default Notepad;

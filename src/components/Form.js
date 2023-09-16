const Form = ({ children, onSubmit }) => {
    const classForm = "bg-white px-9 py-10 space-y-9 shadow-common";

    return (
        <form className={classForm} onSubmit={onSubmit} noValidate>
            {children}
        </form>
    )
}

export default Form;
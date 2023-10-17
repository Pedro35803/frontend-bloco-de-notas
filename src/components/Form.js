const Form = (props) => {
    const classForm = "bg-white px-9 py-10 space-y-9 shadow-common " + props.className;

    return (
        <form {...props} className={classForm} noValidate>
            {props.children}
        </form>
    )
}

export default Form;
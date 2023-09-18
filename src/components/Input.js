const Input = (props) => {
    const classInput = "h-[3.125rem] w-full bg-primary px-4 rounded-lg";
    const name = props.name;
    const error = props.errors[name];
    const register = props.register;

    return (
        <div className="space-y-4">
            <h1 class="text-xl">{props.label}</h1>
            <input
                required
                className={classInput}
                {...register(name)}
                {...props}
            />
            {error ? <p className="text-tertiary">{error.message}</p> : null}
        </div>
    );
};

export default Input;

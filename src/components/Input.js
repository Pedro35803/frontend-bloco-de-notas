const Input = (props) => {
    const classInput = "h-[3.125rem] w-full bg-primary px-4 rounded-lg";
    const error = props.error;
    
    return (
        <div className="space-y-4">
            <h1 class="text-xl">{props.label}</h1>
            <input
                required
                className={classInput}
                onChange={(e) => e.target.value}
                {...props}
            />
            {error ? <p className="text-tertiary">{ error.message }</p> : null}
        </div>
    );
};

export default Input;
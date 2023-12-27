import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  const classInput = "h-[3.125rem] w-full bg-primary px-4 rounded-lg";

  return (
    <label className="flex flex-col gap-4">
      <h1 className="text-xl">{label}</h1>
      <input className={classInput} required ref={ref} {...rest} />
      {error ? <p className="text-tertiary">{error.message}</p> : null}
    </label>
  );
});

export default Input;

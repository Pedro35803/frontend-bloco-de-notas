const Title = ({ text }) => {
    const classTitle = "flex justify-center text-5xl font-bold";

    return (
        <h1 className={classTitle}>{text}</h1>
    )
}

export default Title;
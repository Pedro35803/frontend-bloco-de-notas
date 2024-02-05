import { clearCokkies } from "../services/cookiesHandle";

const Logout = () => {
    return (
        <div className="fixed bottom-6 md:right-10">
            <a
                href="/"
                data-cy="logout"
                onClick={clearCokkies}
                className="bg-transparent py-2 px-4 rounded-full border-4 border-solid border-red-600 text-red-600 text-3xl font-bold"
            >
                -&gt; Sair
            </a>
        </div>
    );
};

export default Logout;

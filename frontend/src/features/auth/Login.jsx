import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError,formState: { errors } } = useForm();


    const onSubmit = async ({ username, password }) => {
    try {
        const response = await fetch("http://localhost:1234/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username:username, password:password }),
        });

        if (!response.ok) {
            const data = await response.json();
            setError("root", { message: data.error });
            return;
        }

        navigate("/");
    } catch (err) {
        setError("root", { message: "Server error" });
    }
};

    return (
        <form className="bg-white flex flex-col text-lg  p-5 gap-5" onSubmit={handleSubmit(onSubmit)}>

            <div className="space-y-1">
                <input className="border border-gray-300 p-2 rounded w-full" placeholder="username" {...register("username", { required: "Username is required" })} />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div className="space-y-1">
                <input className="border border-gray-300 p-2 rounded w-full" type="password" placeholder="password" {...register("password", { required: "Password is required" })} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-1">
                <button className="bg-blue-950 w-full hover:bg-blue-900 cursor-pointer rounded text-white py-2" type="submit">Login</button>
                {errors.root && <p className="text-red-500">{errors.root.message}</p>}
            </div>
        
        </form>
    );
}
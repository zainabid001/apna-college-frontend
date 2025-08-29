"use client";
import { userService } from "@/_services/user";
import { setUser } from "@/_store/_reducers/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit = async (data: LoginForm) => {
        console.log("Login Data:", data);
        await userService.login(data).then((data) => {
            Cookies.set("token", data.token, { expires: 3650 });
            dispatch(setUser(data?.user));
            router?.push('/profile');
            console.log(data, ">>>>>");
        }).catch((error) => {
            console.log("Error", error);
            toast.error("Somethig went wrong");
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <Link href="/" className="flex items-center justify-center space-x-2 text-2xl font-medium text-indigo-500 my-3">
                    <span>
                        <img
                            src="/img/logo.svg"
                            alt="N"
                            width="32"
                            height="32"
                            className="w-8"
                        />
                    </span>
                    <span>Nextly</span>
                </Link>
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Log in to continue your journey 🚀
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300 shadow-md"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

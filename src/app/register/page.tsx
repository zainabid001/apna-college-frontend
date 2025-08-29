"use client";
import { userService } from "@/_services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
};

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();
    const router = useRouter();

    const onSubmit = async (data: RegisterForm) => {
        console.log("Form Data:", data);
        await userService.register(data).then((data) => {
            console.log(data);
            toast.success("Registration successfully")
            router?.push('/login');
        }).catch((error) => {
            console.error("Error", error);
            toast.error("Something went wrong");
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
                    Create an Account
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Join us and start your journey 🚀
                </p>


                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

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
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
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
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

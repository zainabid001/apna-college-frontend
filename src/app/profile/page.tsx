"use client";
import { clearUser, getUser } from "@/_store/_reducers/user";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Navbar from "@/_components/navbar";

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userStore = useSelector(getUser);
    const [user, setUser] = useState<any>();
    useEffect(() => { setUser(userStore) }, [userStore]);

    const handleLogout = () => {
        dispatch(clearUser());
        Cookies.remove("token");
        window.location.href = "/login";
    };
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-gray-800">
                            {user?.name || "John Doe"}
                        </h2>
                        <p className="text-gray-500">{user?.email || "john@example.com"}</p>
                    </div>

                    <div className="my-6 border-t border-gray-200" />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                            {user?.bio ||
                                "Hi! I’m a passionate developer who loves building beautiful web apps with Next.js and Tailwind CSS. 🚀"}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center space-x-4">
                        <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md">
                            Edit Profile
                        </button>
                        <button onClick={handleLogout} className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition shadow-md cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

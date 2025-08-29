"use client";
import Button from "@/_components/button";
import Navbar from "@/_components/navbar";
import { topicService } from "@/_services/topics";
import { getUser } from "@/_store/_reducers/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type TopicForm = {
    name: string;
    description: string;
};

export default function CreateTopicPage() {
    const userStore = useSelector(getUser);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TopicForm>();

    const onSubmit = async (data: TopicForm) => {
        if (!userStore?.isLoggedIn) return toast.error("Please login first");
        let payload = {
            name: data?.name,
            isComplete: false,
            description: data?.description,
        }
        await topicService.create(payload, userStore?.token).then((data) => {
            // console.log(data);
            toast.success("Topic created successfully");
            router?.push('/topics/sub-topics');
        }).catch((error) => {
            console.error("Error", error);
            toast.success("Somethig went wrong");
        })
    };
    function navigate() {
        if (!userStore?.isLoggedIn) return toast.error("Please login first");
        router?.push('/topics/create')
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
                    <Button onClick={navigate} className="fixed top-28 right-4 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition cursor-pointer">
                        + Sub Topic
                    </Button>
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Create a New Topic 📝
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        Share your thoughts and start a discussion!
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Topic Title
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Title is required",
                                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                                })}
                                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="e.g. Future of AI"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Write something interesting about your topic..."
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" variant="primary" className="w-full cursor-pointer">
                            Create Topic
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

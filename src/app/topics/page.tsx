"use client";
import Accordion from "@/_components/accordion";
import Button from "@/_components/button";
import Navbar from "@/_components/navbar";
import { getUser } from "@/_store/_reducers/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type TopicForm = {
    topic: string;
    description: string;
};
const fetchTopics = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
    return res.json();
};

export default function CreateTopicPage() {
    const userStore = useSelector(getUser);
    const router = useRouter();
    const [topics, setTopics] = useState<any[]>([]);
    useEffect(() => {
        fetchTopics().then(data => setTopics(data?.topics));
    }, []);
    async function reFetchTopics() {
        await fetchTopics().then(data => setTopics(data?.topics));
    }
    function navigate(){
        if(!userStore?.isLoggedIn) return toast.error("Please login first");
        router?.push('/topics/create')
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
                            All Topics
                        </h2>

                        <Button onClick={navigate} variant="primary" className="cursor-pointer">
                            + Create Topic
                        </Button>
                    </div>


                    <div className="space-y-4">
                        <Accordion items={topics} onApiComplete={reFetchTopics} />
                    </div>

                </div>
            </div>

        </>
    );
}

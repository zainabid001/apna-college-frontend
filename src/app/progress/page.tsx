"use client";

import Navbar from "@/_components/navbar";
import { useEffect, useState } from "react";

const fetchTopics = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
    return res.json();
};

export default function TopicsPage() {
    const [topics, setTopics] = useState<any[]>([]);
    useEffect(() => {
        fetchTopics().then(data => setTopics(data?.topics));
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="max-w-full mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">
                        Topics & Levels
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topics.map((topic) => {
                            const total = topic.subTopics?.length || 0;
                            // Count levels
                            const levelCount = topic.subTopics?.reduce(
                                (acc, sub) => {
                                    acc[sub.level] = (acc[sub.level] || 0) + 1;
                                    return acc;
                                },
                                { easy: 0, medium: 0, hard: 0 } as Record<string, number>
                            ) || { easy: 0, medium: 0, hard: 0 };

                            // Calculatation
                            const levelPercentage: any = {
                                easy: total ? ((levelCount.easy / total) * 100).toFixed(1) : "0",
                                medium: total ? ((levelCount.medium / total) * 100).toFixed(1) : "0",
                                hard: total ? ((levelCount.hard / total) * 100).toFixed(1) : "0",
                            };

                            return (
                                <div
                                    key={topic._id}
                                    className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{topic.name}</h2>

                                    <div className="space-y-3">
                                        {["easy", "medium", "hard"].map((level) => (
                                            <div key={level}>
                                                <div className="flex justify-between mb-1 capitalize">
                                                    <span className="text-sm font-medium text-gray-700">{level}</span>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {levelPercentage[level]}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className={
                                                            level === "easy"
                                                                ? "bg-green-500 h-3 rounded-full"
                                                                : level === "medium"
                                                                    ? "bg-yellow-400 h-3 rounded-full"
                                                                    : "bg-red-500 h-3 rounded-full"
                                                        }
                                                        style={{ width: `${levelPercentage[level]}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </>
    );
}

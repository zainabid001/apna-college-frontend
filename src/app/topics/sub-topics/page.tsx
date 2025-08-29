"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "@/_components/button";
import Navbar from "@/_components/navbar";
import { subTopicService } from "@/_services/sub.topics";
import { useSelector } from "react-redux";
import { getUser } from "@/_store/_reducers/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fetchTopics = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
  return res.json();
};

type SubTopicForm = {
  topic: string;
  name: string;
  isComplete: boolean;
  leetcodeLink: string;
  youtubeLink: string;
  articleLink: string;
  level: string;
};

export default function CreateSubTopic() {
  const userStore = useSelector(getUser);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SubTopicForm>();
  const [topics, setTopics] = useState<{ _id: string, name: string }[]>([]);

  useEffect(() => {
    fetchTopics().then(data => setTopics(data?.topics));
  }, []);

  const onSubmit = async (data: SubTopicForm) => {
    if (!userStore?.isLoggedIn) return toast.error("Please login first");
    let payload = {
      name: data?.name,
      topic: data?.topic,
      isComplete: false,
      leetcodeLink: data?.leetcodeLink,
      youtubeLink: data?.youtubeLink,
      articleLink: data?.articleLink,
      level: data?.level,
    }
    await subTopicService.create(payload, userStore?.token).then((data) => {
      router?.push('/topics');
      toast.success("Sub Topic created successfully");
    }).catch((error) => {
      console.error("Error", error);
      toast.error("Something went wrong");
    })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex justify-center items-start pt-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create SubTopic 📚</h2>
          <p className="text-center text-gray-500 mt-2">Fill out the details for this subtopic</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Topic</label>
              <select
                {...register("topic", { required: "Topic is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select a topic</option>
                {topics.map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
              {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SubTopic Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Dynamic Programming Basics"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LeetCode Link</label>
              <input
                type="url"
                {...register("leetcodeLink", { required: "LeetCode link is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="https://leetcode.com/problem/..."
              />
              {errors.leetcodeLink && <p className="text-red-500 text-sm mt-1">{errors.leetcodeLink.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
              <input
                type="url"
                {...register("youtubeLink", { required: "YouTube link is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="https://www.youtube.com/..."
              />
              {errors.youtubeLink && <p className="text-red-500 text-sm mt-1">{errors.youtubeLink.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Article Link</label>
              <input
                type="url"
                {...register("articleLink", { required: "Article link is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="https://medium.com/..."
              />
              {errors.articleLink && <p className="text-red-500 text-sm mt-1">{errors.articleLink.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                {...register("level", { required: "Level is required" })}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
            </div>

            <Button type="submit" variant="primary" className="w-full cursor-pointer">
              Create SubTopic
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { createTodo } from "@/service/mutation/create-todo";

interface DataType {
  title: string;
  description: string;
  id: number;
}

export const TodoForm = () => {
  const { register, handleSubmit } = useForm<DataType>();
  const navigate = useRouter();
  const [loading, startTransition] = React.useTransition();

  const onSubmit = async (data: DataType) => {
    try {
      startTransition(async () => {
        await createTodo(data);
        navigate.push("/");
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="border-2 max-w-4xl mx-auto py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Title
                  </label>
                  <input
                    {...register("title", { required: true })}
                    placeholder="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <input
                    {...register("description", { required: true })}
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    type="text"
                  />
                </div>
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                  type="submit"
                >
                  {loading ? "loading..." : "Create Todo"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

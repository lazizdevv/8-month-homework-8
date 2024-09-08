"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateTodo } from "@/service/mutation/edit-todo"; // `updateTodo` import qilish

interface TodoFormData {
  title: string;
  description: string;
}

interface EditFormProps {
  todoId: number;
  currentTitle: string;
  currentDescription: string;
}

export const EditForm: React.FC<EditFormProps> = ({
  todoId,
  currentTitle,
  currentDescription,
}) => {
  const { register, handleSubmit } = useForm<TodoFormData>({
    defaultValues: {
      title: currentTitle,
      description: currentDescription,
    },
  });
  const router = useRouter();
  const [loading, startTransition] = React.useTransition();

  const onSubmit = async (data: TodoFormData) => {
    startTransition(async () => {
      try {
        await updateTodo(todoId, data);
        router.push("/");
      } catch (error) {
        const err = (error as Error).message;
        throw new Error(err);
      }
    });
  };

  return (
    <div className="border-2 p-5 max-w-4xl mx-auto py-5">
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
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                type="submit"
              >
                {loading ? "Loading..." : "Update Todo"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

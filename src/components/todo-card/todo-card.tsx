"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/service/mutation/delete-todo";
import Link from "next/link";
import { EditIcon } from "@/assets/svgs/EditIcon";
import { DeleteIcon } from "@/assets/svgs/DeleteIcon";
import { Loading } from "../loading/loading";

interface dataType {
  title: string;
  description: string;
  id: number;
}

export const TodoCard: React.FC<dataType> = ({ description, id, title }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTodo(id);
      router.refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative shadow-md shadow-primary rounded-lg p-4 max-w-2xl transition-opacity duration-300 bg-white/5  ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="my-5">
        <span className="to-primary font-black">Title:</span>
        <h1 className="text-lg font-bold break-all whitespace-normal overflow-hidden">
          {title}
        </h1>
      </div>
      <div className="">
        <span className="to-primary font-black">Description:</span>
        <p className="text-base font-semibold break-all whitespace-normal overflow-hidden">
          {description}
        </p>
      </div>
      <div className="flex gap-5 items-center absolute right-0 top-0 p-3">
        <button
          className="hover:scale-105 transition-all hover:text-red-700 text-red-500"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <Loading /> : <DeleteIcon />}
        </button>

        <Link href={`/edit-todo/${id}`}>
          <div className="hover:scale-105 transition-all hover:text-yellow-700 text-yellow-500">
            <EditIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

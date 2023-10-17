"use client";

import CommentCard from "./Card";
import { IAnnouncement } from "@/app/(products)/sale/[id]/page";
import Link from "next/link";
import { Button } from "../ui/button";
import { addComment } from "@/app/actions";
import { toast } from "react-toastify";
import { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface IComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  timeElapsed: string;
}

interface CommentsProps {
  comments: IComment[];
  announcement: IAnnouncement;
  decoded: any;
  user: any;
}

function getNamesInitials(name: string) {
  if (!name) return;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === " ") {
      return name.split(" ")[0][0] + name.split(" ")[1][0];
    }
  }

  return name[0];
}

export default function Comments({
  comments,
  announcement,
  decoded,
  user,
}: CommentsProps) {
  const { pending } = useFormStatus();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state: IComment[], action: any) => [
      ...state,
      {
        id: "",
        text: action.text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
          name: user.name,
          email: user.email,
        },
        timeElapsed: "há menos de um minuto",
      },
    ]
  );

  const clientAction = async (formData: FormData) => {
    const comment = {
      text: formData.get("comment"),
    };

    setOptimisticComments((state: IComment[]) => {
      return [
        ...state,
        {
          id: "",
          text: comment.text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            name: user.name,
            email: user.email,
          },
          timeElapsed: "há menos de um minuto",
        },
      ];
    });
    const response = await addComment(comment, announcement.id);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
      });
    } else {
      toast.success("Comentário adicionado com sucesso!", {
        autoClose: 2000,
      });

      ref.current!.value = "";
    }
  };

  return (
    <>
      <div className="flex w-[95%] flex-col gap-4 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:max-w-[752px]">
        <h1 className="heading-6-600 text-gray-200">Comentários</h1>

        {comments.length > 0 ? (
          optimisticComments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              user={announcement.user}
              decoded={decoded}
            />
          ))
        ) : (
          <h1 className="heading-6-600 text-center text-gray-200">
            Seja o primeiro a comentar
          </h1>
        )}
      </div>
      {user.name ? (
        <div className="flex w-[95%] flex-col gap-6 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:max-w-[752px]">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white">
              {getNamesInitials(user.name)}
            </span>
            <h1 className="heading-6-600 text-gray-200">{user.name}</h1>
          </div>
          <form
            action={clientAction}
            className="flex w-full flex-col gap-3 md:relative md:h-32 md:border md:border-gray-600"
          >
            <textarea
              name="comment"
              className="resize-none rounded border border-gray-600 p-2 outline-none focus:border-brand-100 md:border-none"
              placeholder="Escreva seu comentário aqui"
              ref={ref}
              required
            ></textarea>
            <Button
              type="submit"
              disabled={pending}
              className="mt-3 w-24 bg-brand-100 text-gray-1000 md:absolute md:bottom-0 md:right-0"
            >
              Comentar
            </Button>
          </form>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span
                className="body-2-600 cursor-pointer rounded bg-brand-400 p-2 text-brand-100"
                onClick={() => {
                  if (ref.current!.value === "") {
                    ref.current!.value += "Gostei muito!";
                  } else {
                    ref.current!.value = "";
                    ref.current!.value += "Gostei muito!";
                  }
                }}
              >
                Gostei muito!
              </span>
              <span
                className="body-2-600 cursor-pointer rounded bg-brand-400 p-2 text-brand-100"
                onClick={() => {
                  if (ref.current!.value === "") {
                    ref.current!.value += "Incrivel!";
                  } else {
                    ref.current!.value = "";
                    ref.current!.value += "Incrivel!";
                  }
                }}
              >
                Incrivel!
              </span>
              <span
                className="body-2-600 cursor-pointer rounded bg-brand-400 p-2 text-brand-100"
                onClick={() => {
                  if (ref.current!.value === "") {
                    ref.current!.value += "Recomendarei para meus amigos!";
                  } else {
                    ref.current!.value = "";
                    ref.current!.value += "Recomendarei para meus amigos!";
                  }
                }}
              >
                Recomendarei para meus amigos!
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-[95%] flex-col gap-5 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:max-w-[752px]">
          <h1 className="heading-6-600 text-gray-200">
            Faça login para comentar
          </h1>
          <button className="h-10 w-24 border border-gray-600 bg-gray-1000 text-gray-200">
            <Link href={"/login"} className="h-full w-full ">
              Login
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

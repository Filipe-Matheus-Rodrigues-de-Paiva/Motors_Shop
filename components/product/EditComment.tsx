"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";
import { updateComment } from "@/app/actions";
import { IComment } from "@/app/(products)/sale/[id]/page";
import { Button } from "../ui/button";

interface Props {
  comment: IComment;
}

export default function EditComment({ comment }: Props) {
  const editAction = async (formData: FormData) => {
    const updatedComment = {
      text: formData.get("comment"),
    };

    const response = await updateComment(updatedComment, comment.id);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
      });
    } else {
      toast.success("Comentário atualizado com sucesso!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Edit className="cursor-pointer" size={20} />
      </DialogTrigger>
      <DialogContent className="bg-gray-1000">
        <DialogHeader>
          <DialogTitle>Editar comentário</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form action={editAction} className="flex flex-col gap-3">
            <textarea
              className="h-20 w-full resize-none rounded-md bg-gray-800 p-2 outline-none focus:ring-2 focus:ring-brand-100"
              name="comment"
              defaultValue={comment.text}
            />
            <DialogTrigger className="w-fit self-end">
              <Button
                type="submit"
                className="bg-brand-100 text-white hover:bg-brand-200"
              >
                Salvar
              </Button>
            </DialogTrigger>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { deleteComment } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "react-toastify";

export default function AlertDeleteComment({
  commentId,
}: {
  commentId: string;
}) {
  const { pending } = useFormStatus();
  const deleteAction = async () => {
    const response = await deleteComment(commentId);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
      });
    } else {
      toast.success("Comentário excluído com sucesso!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="cursor-pointer" color="red" size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-1000">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Você tem certeza que deseja excluir
            esse comentário?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-200 hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-feedback-alert text-white hover:bg-feedback-alertLight hover:text-gray-100"
            onClick={deleteAction}
            type="submit"
            disabled={pending}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

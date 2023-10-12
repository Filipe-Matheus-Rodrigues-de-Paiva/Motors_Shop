"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";
import { deleteUser } from "@/app/actions";
import { toast } from "react-toastify";
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
import { ILoggedUser } from "./NavBar";

interface props {
  user: ILoggedUser;
}

export default function EditProfile({ user }: props) {
  const deleteAction = async () => {
    const response = await deleteUser(user.id);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    } else {
      toast.success("Perfil excluído com sucesso!", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer px-2 text-sm">
        Editar Perfil
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] flex-col items-center gap-3 overflow-y-auto border border-brand-100 bg-white px-0 pb-0 shadow-2xl">
        <DialogHeader className="self-start px-3">
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex w-[95%] flex-col items-center gap-3">
          <p className="self-start">Informações pessoais</p>
          <EditProfileForm user={user} />
          <DialogFooter className="sticky bottom-0 flex h-20 w-full gap-2 bg-white pr-3">
            <DialogTrigger>
              <span className="body-1-600 absolute bottom-5 left-5 flex h-11 items-center justify-center rounded border bg-gray-700 px-3 text-gray-300 sm:w-[150px]">
                Cancelar
              </span>
            </DialogTrigger>

            <AlertDialog>
              <AlertDialogTrigger>
                <span className="body-1-600 absolute bottom-5 left-40 flex h-11 w-32 items-center justify-center rounded border bg-feedback-alertLight px-3 text-feedback-alert sm:left-52 sm:w-[150px]">
                  Excluir Perfil
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Essa ação irá excluir seu
                    perfil e todos os seus dados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded border-gray-500 bg-gray-200 text-gray-1100 hover:animate-pulse hover:bg-gray-100">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteAction}
                    className="heading-7-600 rounded bg-feedback-alert text-white hover:animate-pulse hover:bg-feedback-alertLight hover:text-feedback-alert focus:animate-ping"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

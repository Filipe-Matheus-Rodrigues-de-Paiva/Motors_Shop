import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditAddressForm from "./EditAddressForm";
import { ILoggedUser } from "./NavBar";

export default function EditAddress({ user }: { user: ILoggedUser }) {
  return (
    <Dialog>
      <DialogTrigger className="mt-2 cursor-pointer px-2 text-sm">
        Editar Endereço
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-3 border border-gray-500 bg-white px-2 pb-0 shadow-2xl">
        <DialogHeader className="self-start px-3">
          <DialogTitle>Editar Endereço</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex w-full flex-col items-center gap-3">
          <p className="body-2-500 self-start px-3 text-black">
            Informações de endereço
          </p>
          <EditAddressForm user={user} />
          <DialogFooter className="flex h-14 w-full gap-2 bg-white">
            <DialogTrigger>
              <Button className="body-1-600 absolute bottom-5 left-5 w-[100px] border bg-gray-700 text-gray-300 sm:w-[180px]">
                Cancelar
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

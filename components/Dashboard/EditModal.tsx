import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormEdit from "./FormEdit";

export default function EditModal({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start">
        <span className="flex h-9 items-center justify-center border-[1.5px] border-gray-200 bg-[#FFF] px-5">
          Editar anúncio
        </span>
      </DialogTrigger>
      <DialogContent className="shadow-modal max-h-[80vh] overflow-y-auto border-none bg-white px-0 py-7">
        <DialogHeader className="flex flex-col gap-4 px-4">
          <DialogTitle>Editar anúncio</DialogTitle>
          <DialogDescription className="heading-6-500 text-black">
            Informações do veiculo
          </DialogDescription>
        </DialogHeader>
        <FormEdit id={id} />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormCreate from "./FormCreate";

export default function CreateAnnouncementModal() {
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start">
        <span className="flex h-11 w-40 items-center justify-center self-start border-[1.5px] border-brand-100 bg-transparent text-base font-bold text-brand-100">
          Criar anúncio
        </span>
      </DialogTrigger>
      <DialogContent className="shadow-modal max-h-[80vh] overflow-y-auto border-none bg-white px-0 py-7">
        <DialogHeader className="flex flex-col gap-4 px-4">
          <DialogTitle>Criar anuncio</DialogTitle>
          <DialogDescription className="heading-6-500 text-black">
            Informações do veiculo
          </DialogDescription>
        </DialogHeader>
        <FormCreate />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import Input from "../shared/input/Input";
import InputCurrency from "../shared/input/InputPrice";
import { DialogTrigger } from "../ui/dialog";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useState } from "react";
import { deleteAnnouncement, updateAnnouncement } from "@/app/actions";
import { toast } from "react-toastify";
import { updateAnnouncementSchema } from "@/lib/types";
import { Trash } from "lucide-react";
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
} from "../ui/alert-dialog";

export default function FormEdit({ id }: { id: string }) {
  const [imageFields, setImageFields] = useState([""]);
  const { pending } = useFormStatus();

  const addImageField = (e: any) => {
    e.preventDefault();
    setImageFields([...imageFields, ""]);
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedFields = [...imageFields];
    updatedFields[index] = value;
    setImageFields(updatedFields);
  };

  const excludeImageField = (e: any, index: number) => {
    e.preventDefault();
    const updatedFields = [...imageFields];
    updatedFields.splice(index, 1);
    setImageFields(updatedFields);
  };

  const clientAction = async (formData: FormData) => {
    const data = {
      brand: formData.get("brand") || undefined,
      model: formData.get("model") || undefined,
      year: Number(formData.get("year")) || undefined,
      fueling: formData.get("fueling") || undefined,
      kilometers: Number(formData.get("kilometers")) || undefined,
      color: formData.get("color") || undefined,
      fipe_price: formData.get("fipe_price") || undefined,
      description: formData.get("description") || undefined,
      coverImage: formData.get("coverImage") || undefined,
      images: imageFields.map((image) => ({ imageUrl: image })) || undefined,
    };

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    /* client-side validation Zod */
    const result = updateAnnouncementSchema.safeParse(filteredData);
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.error(errorMessage);
      return;
    }

    const response = await updateAnnouncement(result.data, id);

    if (response?.error) {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    toast.success("Anúncio atualizado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const deleteAction = async () => {
    const response = await deleteAnnouncement(id);

    if (response?.error) {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.success("Anúncio excluído com sucesso!", {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-3 px-4">
      <Input
        label="Marca"
        type="text"
        placeholder="ex: Chevrolet"
        name="brand"
      />
      <Input label="Modelo" type="text" placeholder="ex: Onix" name="model" />
      <div className="flex justify-between gap-3">
        <Input label="Ano" type="text" placeholder="ex: 2021" name="year" />
        <Input
          label="Combustivel"
          type="text"
          placeholder="ex: gasolina"
          name="fueling"
        />
      </div>
      <div className="flex justify-between gap-3">
        <Input
          label="Quilometragem"
          type="text"
          placeholder="ex: 10000"
          name="kilometers"
        />
        <Input label="Cor" type="text" placeholder="ex: Preto" name="color" />
      </div>
      <InputCurrency />
      <div className="flex flex-col gap-3">
        <label className="body-2-500 text-gray-200">Descrição</label>
        <textarea
          name="description"
          className="h-28 w-full resize-none border-[1.5px] border-gray-800 px-4 outline-none focus:border-brand-200"
          placeholder="ex: Carro em ótimo estado, único dono, sem multas, sem dívidas, etc."
        />
      </div>
      <Input
        label="Imagem de capa"
        type="text"
        name="coverImage"
        placeholder="https://image.com"
      />
      {imageFields.map((image, index) => (
        <Input
          key={index}
          label={`${index + 1}º imagem de galeria`}
          type="text"
          value={image}
          name="imageUrl"
          placeholder="https://image.com"
          onChange={(e) => handleImageChange(index, e.target.value)}
        />
      ))}
      <button
        className="mt-3 h-12 rounded-none border-2 border-gray-800 bg-brand-400 text-base font-semibold text-brand-100"
        onClick={addImageField}
      >
        Adicionar campo para imagem de galeria
      </button>

      {imageFields.length > 1 ? (
        <button
          onClick={(e) => excludeImageField(e, imageFields.length - 1)}
          className="w-fit self-center"
        >
          <Trash />
        </button>
      ) : null}

      <div className="flex flex-row-reverse gap-4">
        <DialogTrigger
          type="submit"
          disabled={pending}
          className={`mt-2 h-11 max-w-[160px] rounded border px-3 ${
            pending ?? "bg-brand-300"
          } bg-brand-100 text-white`}
        >
          {pending ? (
            "carregando..."
          ) : (
            <span className="body-1-600">Salvar alterações</span>
          )}
        </DialogTrigger>

        <AlertDialog>
          <AlertDialogTrigger className="mt-2 h-11 max-w-[130px] rounded border border-feedback-alert bg-feedback-alertLight px-3">
            <span className="body-1-600 text-feedback-alert">Excluir</span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-1000">
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Você tem certeza que deseja
                excluir esse anúncio?
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

        <DialogTrigger className="mt-2 h-11 w-full max-w-[130px] rounded border bg-gray-200 hover:animate-pulse">
          <span className="body-1-600">Cancelar</span>
        </DialogTrigger>
      </div>
    </form>
  );
}

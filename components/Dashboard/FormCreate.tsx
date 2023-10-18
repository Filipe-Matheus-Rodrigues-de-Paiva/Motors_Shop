"use client";

import React, { useState } from "react";
import Input from "../shared/input/Input";
import InputCurrency from "../shared/input/InputPrice";
import { Trash } from "lucide-react";
import { createAnnouncementSchema } from "@/lib/types";
import { toast } from "react-toastify";
import { addAnnouncement } from "@/app/actions";
import { DialogTrigger } from "../ui/dialog";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormCreate() {
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
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: Number(formData.get("year")),
      fueling: formData.get("fueling"),
      kilometers: Number(formData.get("kilometers")),
      color: formData.get("color"),
      fipe_price: formData.get("fipe_price"),
      description: formData.get("description"),
      coverImage: formData.get("coverImage"),
      images: imageFields.map((image) => ({ imageUrl: image })),
    };

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    /* client-side validation Zod */
    const result = createAnnouncementSchema.safeParse(filteredData);
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.warn(errorMessage);
      return;
    }

    /* server-side validation */
    const response = await addAnnouncement(result.data);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    /* Success */
    toast.success("Anúncio criado com sucesso!", {
      autoClose: 2000,
      hideProgressBar: true,
      position: "top-center",
    });
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
          className={`mt-2 h-11 w-full max-w-[130px] rounded border ${
            pending ?? "bg-brand-300"
          } bg-brand-100 text-white`}
        >
          {pending ? (
            "carregando..."
          ) : (
            <span className="body-1-600">Criar anúncio</span>
          )}
        </DialogTrigger>
        <DialogTrigger className="mt-2 h-11 w-full max-w-[130px] rounded border bg-gray-200 hover:animate-pulse">
          <span className="body-1-600">Cancelar</span>
        </DialogTrigger>
      </div>
    </form>
  );
}

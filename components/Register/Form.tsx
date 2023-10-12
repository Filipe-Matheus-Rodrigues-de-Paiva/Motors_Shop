"use client";

import { handleRegister } from "@/app/actions";
import SubmitButton from "../shared/button/Button";
import InputCPF from "../shared/input/InputCpf";
import { Button } from "../ui/button";
import Input from "../shared/input/Input";
import { useRef, useState } from "react";
import InputPhone from "../shared/input/InputPhone";
import InputData from "../shared/input/InputDate";
import { toast } from "react-toastify";
import { registerSchema } from "@/lib/types";
import { toast as newToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";

export default function RegisterForm() {
  const [account, setAccount] = useState("");
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionLength, setDescriptionLength] = useState(
    descriptionRef.current?.value.length
  );

  const clientAction = async (formData: FormData) => {
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      cpf: formData.get("cpf"),
      phone_number: formData.get("phone_number"),
      date_birth: formData.get("date_birth"),
      description: formData.get("description"),
      address: {
        cep: formData.get("cep"),
        state: formData.get("state"),
        city: formData.get("city"),
        street: formData.get("street"),
        number: Number(formData.get("number")),
        complement: formData.get("complement"),
      },
      account_type: account,
      password: formData.get("password"),
      confirm: formData.get("confirm"),
    };

    /* Client-side validation */
    const result = registerSchema.safeParse(registerData);
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.warn(errorMessage);
      return;
    }

    /* Server-side validation */
    const response = await handleRegister(result.data);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      newToast({
        title: "Conta criada!",
        action: (
          <ToastAction altText="Ir para login" className="border-none">
            <Link href={"/login"}>Ir para página de login</Link>
          </ToastAction>
        ),
        style: {
          zIndex: 50,
          backgroundColor: "#FFF",
          color: "#000",
        },
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-5">
      <Input name="name" type="text" label="Nome" placeholder="Ex: Filipe" />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Ex: filipe@gmail.com"
      />
      <InputCPF />
      <InputPhone />
      <InputData />
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="body-2-500 text-gray-200">
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          ref={descriptionRef}
          onChange={(e) => setDescriptionLength(e.target.value.length)}
          placeholder="Digitar descrição"
          className="resize-none border-[1.5px] border-gray-400 px-3 py-2 text-black"
        />
        <p>{descriptionLength} caracteres</p>
      </div>
      <h3 className="body-2-500 text-black">Informações de endereço</h3>
      <Input name="cep" type="text" label="CEP" placeholder="00000-000" />
      <div className="flex w-full gap-4">
        <Input
          name="state"
          type="text"
          label="Estado"
          placeholder="Digitar estado"
        />
        <Input
          name="city"
          type="text"
          label="Cidade"
          placeholder="Digitar cidade"
        />
      </div>
      <Input
        name="street"
        type="text"
        label="Rua"
        placeholder="Ex: Rua do exemplo"
      />
      <Input type="text" name="number" label="Número" placeholder="Ex: 123" />
      <Input
        name="complement"
        type="text"
        label="Complemento"
        placeholder="Ex: Casa"
      />
      <h3 className="body-2-500 text-black">Tipo de conta</h3>
      <div className="flex w-full gap-4">
        <Button
          className={`heading-7-600 flex-1 border border-gray-500 bg-gray-1000 text-black ${
            account === "comprador" ? "bg-brand-100 text-white" : null
          }`}
          onClick={(e) => {
            e.preventDefault();
            setAccount(e.currentTarget.innerHTML.toLowerCase());
          }}
        >
          Comprador
        </Button>
        <Button
          className={`heading-7-600 flex-1 border border-gray-500 bg-gray-1000 text-black ${
            account === "anunciante" ? "bg-brand-100 text-white" : null
          }`}
          onClick={(e) => {
            e.preventDefault();
            setAccount(e.currentTarget.innerHTML.toLowerCase());
          }}
        >
          Anunciante
        </Button>
      </div>
      <Input
        name="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
      <Input
        name="confirm"
        type="password"
        label="Confirmar senha"
        placeholder="Digite sua senha novamente"
      />
      <SubmitButton className="bg-brand-100 text-white">
        Finalizar cadastro
      </SubmitButton>
    </form>
  );
}

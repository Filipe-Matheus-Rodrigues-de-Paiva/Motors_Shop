"use client";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";
import { handleSubmit } from "@/app/actions";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Form() {
  const clientAction = async (formData: FormData) => {
    const loginCredentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    /* Server-side validation */
    const response = await handleSubmit(loginCredentials);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
      });

      return;
    }

    toast.success("Bem vindo!", { autoClose: 2000 });
  };

  return (
    <form action={clientAction} className="flex flex-col gap-5">
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Digite seu email"
        required
      />
      <Input
        name="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        required
      />
      <div className="flex w-full justify-end">
        <Link
          href="/forgot-password"
          className="body-2-500 text-gray-400 hover:underline"
        >
          Esqueci a senha
        </Link>
      </div>
      <Button className="bg-brand-100 text-white">Entrar</Button>
    </form>
  );
}

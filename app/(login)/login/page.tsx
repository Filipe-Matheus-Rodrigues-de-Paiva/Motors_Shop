import Link from "next/link";
import Form from "@/components/Login/Form";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 pt-20">
      <div className="mt-4 flex h-fit w-[95%] max-w-[412px] flex-col gap-4 rounded bg-[#FDFDFD] px-6 py-5 sm:px-12 sm:py-11">
        <h1 className="heading-5-500 text-black">Login</h1>
        <Form />
        <p className="body-2-400 text-center text-gray-500">
          Ainda não possui uma conta?
        </p>
        <Link
          href="/register"
          className="flex justify-center border-[1.5px] border-gray-200 bg-gray-1000 px-7 py-3 text-black"
        >
          Cadastrar
        </Link>
      </div>
    </div>
  );
}

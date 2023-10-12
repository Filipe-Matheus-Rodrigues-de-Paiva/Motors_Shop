import RegisterForm from "@/components/Register/Form";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 pb-10 pt-20">
      <div className="mt-4 flex h-fit w-[95%] max-w-[412px] flex-col gap-4 rounded bg-[#FDFDFD] px-6 py-5 sm:px-12 sm:py-11">
        <h1 className="heading-5-500 text-black">Cadastro</h1>
        <h3 className="body-2-500 text-black">Informações pessoais</h3>
        <RegisterForm />
      </div>
    </div>
  );
}

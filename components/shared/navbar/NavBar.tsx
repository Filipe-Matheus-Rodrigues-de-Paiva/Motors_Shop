import { MenuIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Button from "../button/Button";
import Link from "next/link";
import { cookies } from "next/headers";
import AvatarDemo from "../Avatar/Avatar";
import { verify } from "jsonwebtoken";
import { baseUrl } from "@/lib/types";
import LogoutButton from "../Avatar/logout/LogoutButton";
import { getNameInitials } from "@/app/(dashboard)/dashboard/page";
import EditProfile from "./EditProfile";
import EditAddress from "./EditAddress";

export interface ILoggedUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  date_birth: string;
  description: string;
  account_type: string;
  address: {
    id: string;
    state: string;
    city: string;
    street: string;
  };
}

export async function getLoggedUserInfo(id: string): Promise<ILoggedUser> {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    cache: "no-cache",
    next: { tags: ["userInfo"] },
  });

  const data = await response.json();

  return data;
}

export default async function NavBar() {
  const tokenValue = cookies().get("JWT_Token")?.value;

  const decoded = verify(
    tokenValue!,
    process.env.JWT_SECRET!,
    (err, decoded) => {
      if (err) return err.message;

      return decoded;
    }
  );

  // @ts-ignore
  const user = await getLoggedUserInfo(decoded.sub.toString());

  return (
    <nav className="fixed top-0 z-50 flex min-h-[80px] w-full items-center justify-between gap-5 border-b-[#FDFDFD] bg-gray-1000 px-4 shadow-2xl md:px-16">
      <Link href={"/"}>
        <h1 className="text-gradient-h1 heading-5-600">Motors shop</h1>
      </Link>
      <Menubar className="border-none md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            {user.name ? (
              <span className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-100 text-white">
                {getNameInitials(user.name)}
              </span>
            ) : (
              <MenuIcon />
            )}
          </MenubarTrigger>
          {!user.name && (
            <MenubarContent className="absolute right-[-50px] cursor-pointer border-none bg-gray-900">
              <MenubarItem>
                <Link href={"/login"}>Fazer login</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Button className="w-full border-[1.5px] border-gray-500 bg-gray-900 px-7 py-3">
                  <Link href={"/register"}>Cadastrar</Link>
                </Button>
              </MenubarItem>
            </MenubarContent>
          )}
          {user.name && (
            <MenubarContent className="absolute right-[-50px] cursor-pointer border-none bg-gray-900">
              <EditProfile user={user} />
              <MenubarSeparator />
              <EditAddress user={user} />
              <MenubarSeparator />
              <MenubarItem
                className={`${
                  user.account_type === "anunciante" ? "block" : "hidden"
                } cursor-pointer`}
              >
                <Link href={"/dashboard"}>Meus anúncios</Link>
              </MenubarItem>
              <MenubarSeparator />
              <LogoutButton />
            </MenubarContent>
          )}
        </MenubarMenu>
      </Menubar>
      {user.name && (
        <div className="hidden min-h-[80px] gap-5 border-l border-brand-100 md:flex md:w-48 md:items-center md:justify-start md:gap-2">
          <AvatarDemo user={user} />
          <h1 className="body-1-400 text-gray-200">{user.name}</h1>
        </div>
      )}
      {!user.name && (
        <div className="hidden gap-5 md:flex">
          <Link href={"/login"}>
            <Button className="border-[1.5px] border-gray-500 px-7 py-3">
              Fazer login
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button className="border-[1.5px] border-gray-500 px-7 py-3">
              Cadastrar
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

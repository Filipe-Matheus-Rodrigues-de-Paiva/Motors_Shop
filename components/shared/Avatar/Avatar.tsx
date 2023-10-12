import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import LogoutButton from "./logout/LogoutButton";
import { getNameInitials } from "@/app/(dashboard)/dashboard/page";
import Link from "next/link";
import EditProfile from "../navbar/EditProfile";
import EditAddress from "../navbar/EditAddress";
import { ILoggedUser } from "../navbar/NavBar";

interface props {
  user: ILoggedUser;
}

export default function AvatarDemo({ user }: props) {
  return (
    <Menubar className="relative border-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white">
            {getNameInitials(user.name)}
          </span>
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-60px] bg-gray-900">
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
      </MenubarMenu>
    </Menubar>
  );
}

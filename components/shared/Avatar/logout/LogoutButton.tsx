"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { deleteCookies } from "@/app/actions";

export default function LogoutButton() {
  return (
    <MenubarItem onClick={() => deleteCookies()} className="cursor-pointer">
      Sair
    </MenubarItem>
  );
}

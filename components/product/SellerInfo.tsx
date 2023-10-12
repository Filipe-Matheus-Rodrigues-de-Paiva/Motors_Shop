import React from "react";
import { Button } from "../ui/button";
import { IAnnouncement } from "@/app/(products)/sale/[id]/page";
import Link from "next/link";

interface Props {
  announcement: IAnnouncement;
}

export default function SellerInfo({ announcement }: Props) {
  function getNameInitials(name: string) {
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") {
        return name.split(" ")[0][0] + name.split(" ")[1][0];
      }
    }

    return name[0];
  }

  return (
    <div className="flex w-[95%] flex-col items-center gap-3 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:hidden xl:max-w-[440px]">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white">
        {getNameInitials(announcement.user.name)}
      </span>
      <h1 className="heading-6-600 text-gray-200">{announcement.user.name}</h1>
      <p className="body-1-400 w-fit self-center text-justify text-gray-300">
        {announcement.user.description}
      </p>
      <Button className="border-[1.5px] bg-gray-100 text-[#FFF]">
        <Link href={`/seller/${announcement.user.id}`}>
          Ver todos os anúncios
        </Link>
      </Button>
    </div>
  );
}

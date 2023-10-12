/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import EditModal from "./EditModal";

interface IProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  fueling: "gasolina" | "etanol";
  kilometers: number;
  color: string;
  fipe_price: string;
  description: string;
  coverImage: string;
  owner: any;
}

export default function Cards({
  id,
  brand,
  model,
  year,
  fueling,
  kilometers,
  color,
  fipe_price,
  description,
  coverImage,
  owner,
}: IProps) {
  const path = usePathname();

  function getNameInitials(name: string) {
    if (!name) return;
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") {
        return name.split(" ")[0][0] + name.split(" ")[1][0];
      }
    }

    return name[0];
  }

  return (
    <div className="flex h-[400px] min-w-[280px] max-w-[330px] flex-col gap-3 shadow-2xl">
      <div className="relative flex h-40 w-full">
        <img src={coverImage} alt="car" className="w-full object-cover" />
      </div>
      <h3 className="heading-7-600 text-black">
        {brand} - {model}
      </h3>
      <p className="body-2-400 text-justify text-gray-300">{description}</p>
      {path !== "/dashboard" ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white">
            {getNameInitials(owner.name)}
          </span>
          <h2 className="body-2-500 text-black">{owner.name}</h2>
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="body-2-500 rounded bg-brand-400 px-3 py-1 text-brand-100">
            {kilometers} km
          </span>
          <span className="body-2-500 rounded bg-brand-400 px-3 py-1 text-brand-100">
            {year}
          </span>
        </div>
        <h2 className="heading-7-500 text-black">{fipe_price}</h2>
      </div>
      {path === "/dashboard" ? (
        <div className="flex gap-3">
          <EditModal id={id} />
        </div>
      ) : null}
    </div>
  );
}

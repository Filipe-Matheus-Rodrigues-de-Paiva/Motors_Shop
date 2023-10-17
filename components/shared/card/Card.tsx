/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */

import { getNameInitials } from "@/app/(dashboard)/dashboard/page";
import { getAnnouncementById } from "@/app/(landing)/page";
import Link from "next/link";

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
  images?: Array<any>;
}

export default async function Card({
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
  images,
}: IProps) {
  const announcementFound = await getAnnouncementById(id);

  return (
    <Link href={`/sale/${id}`}>
      <div className="flex h-full min-w-[280px] max-w-[330px] flex-col gap-2 shadow-2xl xl:min-w-[330px] xl:justify-between">
        <div className="relative flex h-40 w-full">
          <img src={coverImage} alt="car" className="w-full object-cover" />
        </div>
        <h3 className="heading-7-600 text-black">
          {brand} - {model}
        </h3>
        <p className="body-2-400 line-clamp-4 text-justify text-gray-300">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-white`}
          >
            {getNameInitials(announcementFound.user?.name)}
          </span>
          <h2 className="body-2-500 text-black">
            {announcementFound.user?.name}
          </h2>
        </div>
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
      </div>
    </Link>
  );
}

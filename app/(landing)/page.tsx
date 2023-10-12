import PaginationControls from "@/components/shared/Pagination/PaginationControls";
import Card from "@/components/shared/card/Card";
import randomColors from "@/constants/randomColors";
import { baseUrl } from "@/lib/types";
import Image from "next/image";

export const getRandomColor = () => {
  const colors = randomColors;
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  date_birth: string;
  description: string;
  account_type: string;
  password: string;
  confirm: string;
}

interface IImage {
  id: string;
  ImageUrl: string;
}

export interface Announcement {
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
  images?: IImage[];
}

async function getAllAnnouncements() {
  const res = await fetch(`${baseUrl}/announcements`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return data;
}

export async function getAnnouncementById(id: string) {
  const res = await fetch(`${baseUrl}/announcements/${id}`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const announcements: Announcement[] = await getAllAnnouncements();
  const page = searchParams.page ?? "1";
  const limit = searchParams.limit ?? "9";

  const start = (Number(page) - 1) * Number(limit); // 0, 9, 18, 27, 36, 45, 54, 63, 72, 81...
  const end = Number(page) * Number(limit); // 9, 18, 27, 36, 45, 54, 63, 72, 81, 90...

  const entries = announcements.slice(start, end); // 0-9, 9-18, 18-27, 27-36, 36-45, 45-54, 54-63, 63-72, 72-81, 81-90...

  return (
    <>
      <div className="w-full pt-20">
        <div className="relative flex h-96 w-full bg-home-page bg-cover bg-center bg-no-repeat md:h-[500px] md:items-center md:bg-gradient-to-b md:from-gray-400 md:via-[#242525] md:to-[#090909]">
          <Image
            src={"/maserati.png"}
            alt="home-page"
            fill
            className="hidden object-cover object-center md:block"
          />
          <div className="z-30 mt-7 flex w-full flex-col items-center">
            <h2 className="heading-5-600 sm:heading-3-500 mb-3">Motors shop</h2>
            <p className="heading-7-600 sm:heading-5-500 text-center">
              A melhor plataforma de anúncios de carros do país
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex h-[370px] w-full gap-9 overflow-x-auto px-5 py-4 md:h-fit md:flex-wrap md:justify-center md:gap-x-20 md:gap-y-10 md:overflow-hidden md:px-20">
        {entries.map((announcement) => (
          <Card
            key={announcement.id}
            id={announcement.id}
            brand={announcement.brand}
            model={announcement.model}
            year={announcement.year}
            fueling={announcement.fueling}
            kilometers={announcement.kilometers}
            color={announcement.color}
            fipe_price={announcement.fipe_price}
            description={announcement.description}
            coverImage={announcement.coverImage}
            images={announcement.images}
          />
        ))}
      </div>

      <PaginationControls
        hasNextPage={end < announcements.length}
        hasPreviousPage={start > 0}
        announcements={announcements}
      />
    </>
  );
}

import {
  getAllAnnouncementsByUser,
  getNameInitials,
} from "@/app/(dashboard)/dashboard/page";
import Cards from "@/components/Dashboard/Card";
import { getLoggedUserInfo } from "@/components/shared/navbar/NavBar";
import PaginationControls from "@/components/shared/Pagination/PaginationControls";
import { baseUrl } from "@/lib/types";

interface IAnnouncement {
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
}

export interface IUserAnnouncement {
  id: string;
  name: string;
  email: string;
  account_type: string;
  announcements: IAnnouncement[];
}

async function getAllSellers() {
  const response = await fetch(`${baseUrl}/users`, {
    cache: "no-cache",
  });

  const sellers = await response.json();

  return sellers;
}

export async function generateStaticParams() {
  const sellers = await getAllSellers();

  return sellers.map((seller: any) => ({
    id: seller.id,
  }));
}

export default async function SellerAnnouncements({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const announcements: IUserAnnouncement = await getAllAnnouncementsByUser(
    params.id
  );

  const owner = await getLoggedUserInfo(params.id);
  const page = searchParams.page ?? "1";
  const limit = searchParams.limit ?? "9";

  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  const entries = announcements.announcements.slice(start, end);

  return (
    <div className="min-h-fit">
      <div className="mt-20 flex flex-col gap-40 sm:gap-20 lg:gap-9">
        <div className="relative max-h-[40vh] w-full bg-brand-100 pt-5">
          <div className="mx-auto flex min-h-fit w-[95%] flex-col gap-4 rounded border bg-gray-1100 px-7 py-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 text-white">
              {getNameInitials(owner.name)}
            </span>
            <div className="flex items-center gap-3">
              <h1 className="heading-6-600 text-gray-200">{owner.name}</h1>
              <span className="body-2-500 bg-brand-400 p-2 text-brand-100">
                {owner.account_type}
              </span>
            </div>
            <p className="text-justify">{owner.description}</p>
          </div>
        </div>
        <div className="mt-24 flex h-[370px] w-full gap-9 overflow-x-auto px-5 py-4 md:h-fit md:flex-wrap md:justify-center md:gap-x-20 md:gap-y-10 md:overflow-hidden md:px-20">
          {entries.map((announcement: any) => (
            <Cards
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
              owner={owner}
            />
          ))}
        </div>
      </div>

      <PaginationControls
        hasNextPage={end < announcements.announcements.length}
        hasPreviousPage={start > 0}
        announcements={announcements.announcements}
      />
    </div>
  );
}

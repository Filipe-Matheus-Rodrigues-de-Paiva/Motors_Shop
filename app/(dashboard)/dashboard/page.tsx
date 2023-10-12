import { IUserAnnouncement } from "@/app/(seller)/seller/[id]/page";
import Cards from "@/components/Dashboard/Card";
import CreateAnnouncementModal from "@/components/Dashboard/CreateModal";
import PaginationControls from "@/components/shared/Pagination/PaginationControls";
import { getLoggedUserInfo } from "@/components/shared/navbar/NavBar";
import { baseUrl } from "@/lib/types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getNameInitials(name: string) {
  if (!name) return;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === " ") {
      return name.split(" ")[0][0] + name.split(" ")[1][0];
    }
  }

  return name[0];
}

export async function getAllAnnouncementsByUser(id: string) {
  const response = await fetch(`${baseUrl}/announcements/users/${id}`, {
    cache: "no-cache",
    next: { tags: ["userAnnouncements"] },
  });

  const data = await response.json();

  return data;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = cookies().get("JWT_Token")?.value;

  if (!token) redirect("/login");

  // @ts-ignore
  const decoded = verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return err.message;

    return decoded;
  });

  // @ts-ignore
  const owner = await getLoggedUserInfo(decoded.sub.toString());

  const announcements: IUserAnnouncement = await getAllAnnouncementsByUser(
    owner.id
  );

  const page = searchParams.page ?? "1";
  const limit = searchParams.limit ?? "9";

  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);

  const entries = announcements.announcements.slice(start, end);

  return (
    <div className="min-h-fit">
      <div className="mt-20 flex flex-col gap-52 md:gap-40">
        <div className="relative max-h-[40vh] w-full bg-brand-100 pt-5">
          <div className="mx-auto flex min-h-fit w-[95%] flex-col gap-4 rounded border bg-gray-1100 px-7 py-10">
            <span className="heading-3-500 flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 text-white">
              {getNameInitials(owner.name)}
            </span>
            <div className="flex items-center gap-3">
              <h1 className="heading-6-600 text-gray-200">{owner.name}</h1>
              <span className="body-2-500 bg-brand-400 p-2 text-brand-100">
                {owner.account_type}
              </span>
            </div>
            <p className="text-justify">{owner.description}</p>
            <CreateAnnouncementModal />
          </div>
        </div>
        <div className="mt-[-20px]">
          <h1 className="heading-6-500 text-center text-black">Anúncios</h1>
          <div className="flex h-[450px] w-full gap-9 overflow-x-auto px-5 py-4 md:h-fit md:flex-wrap md:justify-center md:gap-x-20 md:gap-y-10 md:overflow-hidden md:px-20">
            {entries.map((announcement) => (
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
      </div>

      {/* Paginação - fazer mais tarde */}
      <PaginationControls
        hasNextPage={end < announcements.announcements.length}
        hasPreviousPage={start > 0}
        announcements={announcements.announcements}
      />
    </div>
  );
}

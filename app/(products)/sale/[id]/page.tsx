/* eslint-disable @next/next/no-img-element */
import { getAllAnnouncements, getAnnouncementById } from "@/app/(landing)/page";
import Button from "@/components/shared/button/Button";
import { baseUrl } from "@/lib/types";
import { cookies } from "next/headers";
import SellerInfo from "@/components/product/SellerInfo";
import { verify } from "jsonwebtoken";
import { getLoggedUserInfo } from "@/components/shared/navbar/NavBar";
import Photos from "@/components/product/Photos";
import PhotosDesktop from "@/components/product/PhotosDesktop";
import SellerInfoDesktop from "@/components/product/SellerInfoDesktop";
import Comments from "@/components/product/Comments";

interface IImage {
  id: string;
  ImageUrl: string;
}

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

export interface IAnnouncement {
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
  user: IUser;
  images?: IImage[];
}

async function getAnnouncementComments(id: string) {
  const response = await fetch(`${baseUrl}/comments/announcements/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    next: { tags: ["comments"] },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Não foi possível carregar os comentários");
  }
}

export interface IComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  timeElapsed: string;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const announcements = await getAllAnnouncements();

  return announcements.map((announcement: any) => ({
    id: announcement.id,
  }));
}

export default async function Product({ params }: { params: { id: string } }) {
  const announcement: IAnnouncement = await getAnnouncementById(params.id);
  const comments: IComment[] = await getAnnouncementComments(params.id);
  const token = cookies().get("JWT_Token")?.value;

  const decoded = verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return err.message;

    return decoded;
  });

  // @ts-ignore
  const user = await getLoggedUserInfo(decoded.sub.toString());

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-100 to-[#EDEAFD] pb-5 xl:flex xl:justify-evenly xl:px-8">
      <div className="mt-20 flex w-full flex-col items-center gap-4 pt-4 xl:mt-24 xl:w-fit xl:p-0">
        {/* Imagem de capa */}
        <img
          src={announcement.coverImage}
          alt="product"
          className="max-h-96 w-[95%] md:max-w-[600px] xl:max-w-[752px]"
        />

        {/* Informações do produto */}
        <div className="flex w-[95%] flex-col gap-5 border border-gray-600 bg-white p-7 md:relative md:max-w-[600px] xl:max-w-[752px]">
          <h1 className="heading-6-600 text-gray-200">
            {announcement.brand} - {announcement.model}
          </h1>
          <div className="flex gap-4">
            <span className="body-2-500 rounded bg-brand-400 px-3 py-1 text-brand-100">
              {announcement.year}
            </span>
            <span className="body-2-500 rounded bg-brand-400 px-3 py-1 text-brand-100">
              {announcement.kilometers} km
            </span>
          </div>
          <div className="md:absolute md:right-5 md:top-[75px]">
            <h2 className="heading-7-500 text-gray-200">
              {announcement.fipe_price}
            </h2>
          </div>
          {announcement.user.id !== user.id ? (
            <Button className="max-w-[200px] bg-brand-100 text-gray-1000">
              Comprar
            </Button>
          ) : null}
        </div>

        {/* Descrição */}
        <div className="flex w-[95%] flex-col gap-3 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:max-w-[752px]">
          <h1 className="heading-6-600 text-gray-200">Descrição</h1>
          <p className="body-1-400 text-gray-300">{announcement.description}</p>
        </div>

        {/* Fotos */}
        <Photos announcement={announcement} />

        {/* Anunciante */}
        <SellerInfo announcement={announcement} />

        {/* Comentários */}
        <Comments
          comments={comments}
          announcement={announcement}
          decoded={decoded}
          user={user}
        />
      </div>
      <div className="hidden xl:mt-24 xl:flex xl:flex-col xl:gap-10">
        <PhotosDesktop announcement={announcement} />
        <SellerInfoDesktop announcement={announcement} />
      </div>
    </div>
  );
}

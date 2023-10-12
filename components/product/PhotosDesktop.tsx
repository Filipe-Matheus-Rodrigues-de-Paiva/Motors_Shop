/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAnnouncement } from "@/app/(products)/sale/[id]/page";

interface Props {
  announcement: IAnnouncement;
}

export default function PhotosDesktop({ announcement }: Props) {
  return (
    <div className="hidden w-[95%] flex-col gap-3 border border-gray-600 bg-white p-7 md:max-w-[600px] xl:flex xl:w-[440px]">
      <h1 className="heading-6-600 text-gray-200">Fotos</h1>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 ">
        {announcement.images?.map((image: any) => (
          <Dialog key={image.id}>
            <DialogTrigger>
              <img
                src={image.ImageUrl}
                alt="product"
                className="h-[90px] w-[90px] xl:h-[150px] xl:w-[150px]"
              />
            </DialogTrigger>
            <DialogContent className="bg-gray-1000">
              <DialogHeader className="flex flex-col gap-5">
                <DialogTitle className="heading-7-500 text-left text-gray-200">
                  Imagem do veiculo
                </DialogTitle>
                <DialogDescription>
                  <img
                    src={image.ImageUrl}
                    alt="product"
                    className="w-full object-contain object-center"
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

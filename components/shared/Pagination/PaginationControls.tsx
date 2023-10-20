/* eslint-disable camelcase */
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface IPaginationControlsProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  announcements: any[];
}

export default function PaginationControls({
  hasNextPage,
  hasPreviousPage,
  announcements,
}: IPaginationControlsProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "9";

  return (
    <div className="mt-4 flex w-full flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-center">
      {hasPreviousPage && (
        <button
          onClick={() => {
            router.push(
              `${pathName}/?page=${Number(page) - 1}&per_page=${per_page}`
            );
          }}
          className="heading-5-600 text-center text-brand-100"
        >
          &lt; Anterior
        </button>
      )}
      {Math.ceil(announcements.length / Number(per_page)) > 1 && (
        <h1 className="text-center">
          {page} de {Math.ceil(announcements.length / Number(per_page))}
        </h1>
      )}
      {hasNextPage && (
        <button
          onClick={() => {
            router.push(
              `${pathName}/?page=${Number(page) + 1}&per_page=${per_page}`
            );
          }}
          className="heading-5-600 text-center text-brand-100"
        >
          Próximo &gt;
        </button>
      )}
    </div>
  );
}

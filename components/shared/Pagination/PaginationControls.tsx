/* eslint-disable camelcase */
"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

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

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "9";

  return (
    <div className="mt-4 flex w-full flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-center">
      {hasPreviousPage && (
        <Link
          href={{
            pathname: pathName,
            search: `?page=${Number(page) - 1}&per_page=${per_page}`,
          }}
          className="heading-5-600 text-center text-brand-100"
        >
          &lt; Anterior
        </Link>
      )}
      <h1 className="text-center">
        {page} de {Math.ceil(announcements.length / Number(per_page))}
      </h1>
      {hasNextPage && (
        <Link
          href={{
            pathname: pathName,
            search: `?page=${Number(page) + 1}&per_page=${per_page}`,
          }}
          className="heading-5-600 text-center text-brand-100"
        >
          Próximo &gt;
        </Link>
      )}
    </div>
  );
}

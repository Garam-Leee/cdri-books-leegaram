import { useInfiniteQuery } from "@tanstack/react-query";

import { searchBooks } from "@/api/book";
import type { ApiError } from "@/api/error";
import type { SearchTarget } from "@/types/search";

interface UseInfiniteBookSearchQueryParams {
  query: string;
  target?: SearchTarget;
}

const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && "type" in error;
};

export default function useInfiniteBookSearchQuery({
  query,
  target,
}: UseInfiniteBookSearchQueryParams) {
  return useInfiniteQuery({
    queryKey: ["books", query, target],
    queryFn: ({ pageParam }) =>
      searchBooks({
        query,
        page: pageParam,
        target,
      }),

    enabled: query.trim().length > 0,
    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      const currentCount = pages.flatMap((page) => page.documents).length;

      if (lastPage.meta.is_end) return undefined;
      if (currentCount >= lastPage.meta.pageable_count) return undefined;

      return pages.length + 1;
    },

    retry: (failureCount, error) => {
      if (isApiError(error)) {
        if (error.type === "network" || error.type === "auth") {
          return false;
        }
      }

      return failureCount < 2;
    },

    retryDelay: 500,
    staleTime: 0,
    networkMode: "always",
  });
}

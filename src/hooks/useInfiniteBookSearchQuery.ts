import { useInfiniteQuery } from "@tanstack/react-query";

import { searchBooks } from "@/api/book";
import type { SearchTarget } from "@/types/search";

interface UseInfiniteBookSearchQueryParams {
  query: string;
  target?: SearchTarget;
}

export default function useInfiniteBookSearchQuery({
  query,
  target,
}: UseInfiniteBookSearchQueryParams) {
  return useInfiniteQuery({
    queryKey: ["books", query, target],
    queryFn: ({ pageParam }) =>
      searchBooks({ query, page: pageParam, target }),
    enabled: query.trim().length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const currentCount = pages.flatMap((page) => page.documents).length;

      if (lastPage.meta.is_end) return undefined;
      if (currentCount >= lastPage.meta.pageable_count) return undefined;

      return pages.length + 1;
    },
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";

import { searchBooks } from "@/api/book";
import type { ApiError } from "@/api/error";
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
      const apiError = error as ApiError;

      // 네트워크나 인증 오류는 재시도하지 않음
      if (apiError?.type === "network" || apiError?.type === "auth") {
        return false;
      }

      // 나머지는 최대 2번 재시도
      return failureCount < 2;
    },

    retryDelay: 500,

    // 데이터를 항상 stale로 간주 (캐시를 사용하되, 항상 백그라운드에서 재검증)
    staleTime: 0,

    // 네트워크 모드: 항상 쿼리를 실행하고, 실패하면 에러 반환
    networkMode: "always",
  });
}

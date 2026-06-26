import { useQuery } from "@tanstack/react-query";

import { searchBooks } from "@/api/book";
import type { SearchTarget } from "@/types/search";

interface UseBookSearchQueryParams {
  query: string;
  page?: number;
  target?: SearchTarget;
}

export default function useBookSearchQuery({
  query,
  page = 1,
  target,
}: UseBookSearchQueryParams) {
  return useQuery({
    queryKey: ["books", query, page, target],
    queryFn: () => searchBooks({ query, page, target }),
    enabled: query.trim().length > 0,
  });
}

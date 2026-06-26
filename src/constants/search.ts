import type { SearchTarget } from "@/types/search";

export const SEARCH_HISTORY_STORAGE_KEY = "search-history";

export const SEARCH_TARGET_OPTIONS: ReadonlyArray<{
  value: SearchTarget;
  label: string;
}> = [
  {
    value: "title",
    label: "제목",
  },
  {
    value: "person",
    label: "저자명",
  },
  {
    value: "publisher",
    label: "출판사",
  },
];

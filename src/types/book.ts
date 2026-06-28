import type { SearchTarget } from "@/types/search";

export interface Book {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface BookSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };

  documents: Book[];
}

export interface SearchBooksParams {
  query: string;
  page?: number;
  size?: number;
  sort?: "accuracy" | "latest";
  target?: SearchTarget;
}

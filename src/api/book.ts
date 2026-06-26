import client from "@/api/client";
import type {
  BookSearchResponse,
  SearchBooksParams,
} from "@/types/book";

export const searchBooks = async ({
  query,
  page = 1,
  size = 10,
  sort = "accuracy",
  target,
}: SearchBooksParams) => {
  const { data } = await client.get<BookSearchResponse>("/v3/search/book", {
    params: {
      query,
      page,
      size,
      sort,
      target,
    },
  });

  return data;
};
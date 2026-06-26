import axios from "axios";

import client from "@/api/client";
import { createApiError, mapKakaoErrorType } from "@/api/error";
import type { Book, BookSearchResponse, SearchBooksParams } from "@/types/book";

type KakaoErrorResponse = {
  code?: number;
  msg?: string;
  message?: string;
};

const normalizeBook = (book: Book): Book => ({
  ...book,
  title: book.title ?? "",
  contents: book.contents ?? "",
  url: book.url ?? "",
  isbn: book.isbn ?? "",
  datetime: book.datetime ?? "",
  authors: book.authors ?? [],
  publisher: book.publisher ?? "",
  translators: book.translators ?? [],
  price: book.price ?? 0,
  sale_price: book.sale_price ?? -1,
  thumbnail: book.thumbnail ?? "",
  status: book.status ?? "",
});

const normalizeBookSearchResponse = (
  response: BookSearchResponse
): BookSearchResponse => ({
  meta: {
    total_count: response.meta?.total_count ?? 0,
    pageable_count: response.meta?.pageable_count ?? 0,
    is_end: response.meta?.is_end ?? true,
  },
  documents: response.documents?.map(normalizeBook) ?? [],
});

export const searchBooks = async ({
  query,
  page = 1,
  size = 10,
  sort = "accuracy",
  target,
}: SearchBooksParams) => {
  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

  if (!apiKey) {
    throw createApiError({
      message: "카카오 REST API Key가 설정되지 않았습니다.",
      status: 401,
      type: "auth",
    });
  }

  try {
    const { data } = await client.get<BookSearchResponse>("/v3/search/book", {
      params: {
        query,
        page,
        size,
        sort,
        target,
      },
    });

    return normalizeBookSearchResponse(data);
  } catch (error) {
    if (axios.isAxiosError<KakaoErrorResponse>(error)) {
      const status = error.response?.status;
      const code = error.response?.data?.code;
      const isNetworkError =
        !error.response ||
        error.code === "ERR_NETWORK" ||
        error.code === "ECONNABORTED" ||
        error.message?.includes("Network Error");

      throw createApiError({
        message: isNetworkError
          ? "네트워크 연결이 불안정합니다. 인터넷 연결을 확인한 후 다시 시도해 주세요."
          : error.response?.data?.msg ??
            error.response?.data?.message ??
            "도서 정보를 불러오지 못했습니다.",
        status,
        code,
        type: isNetworkError ? "network" : mapKakaoErrorType(code, status),
      });
    }

    throw createApiError({
      message: "알 수 없는 오류가 발생했습니다.",
      type: "unknown",
    });
  }
};

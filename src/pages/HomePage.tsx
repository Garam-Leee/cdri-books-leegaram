import styled from "@emotion/styled";
import { useState } from "react";

import BookList from "@/components/book/BookList";
import SearchSection from "@/components/book/SearchSection";
import { ErrorStatus, LoadingStatus } from "@/components/common";
import { NAV_ITEMS } from "@/constants/nav";
import useInfiniteBookSearchQuery from "@/hooks/useInfiniteBookSearchQuery";
import AppLayout from "@/layouts/AppLayout";
import type { SearchTarget } from "@/types/search";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [target, setTarget] = useState<SearchTarget | undefined>();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteBookSearchQuery({
    query: submittedKeyword,
    target,
  });

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <AppLayout title={NAV_ITEMS.search.name}>
      <SearchSection
        keyword={keyword}
        onChangeKeyword={setKeyword}
        onSearch={({ keyword, target }) => {
          setSubmittedKeyword(keyword);
          setTarget(target);
        }}
      />

      <ResultCount>
        도서 검색 결과 &nbsp;&nbsp; 총 <Count>{totalCount}</Count>건
      </ResultCount>

      {isLoading && <LoadingStatus />}

      {error && <ErrorStatus text="도서 검색 중 오류가 발생했습니다." />}

      {!isLoading && !error && (
        <BookList
          books={books}
          hasMore={!!hasNextPage && !isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
    </AppLayout>
  );
}

const ResultCount = styled.p(({ theme }) => ({
  color: theme.colors.text.primary,
  ...theme.typography.body2,
}));

const Count = styled.span(({ theme }) => ({
  color: theme.colors.palette.primary,
}));

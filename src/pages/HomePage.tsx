import styled from "@emotion/styled";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getBookSearchErrorMessage } from "@/api/error";
import BookList from "@/components/book/BookList";
import SearchSection from "@/components/book/SearchSection";
import BookCardSkeleton from "@/components/book/skeleton/BookCardSkeleton";
import { ErrorStatus } from "@/components/common";
import { NAV_ITEMS } from "@/constants/nav";
import useInfiniteBookSearchQuery from "@/hooks/useInfiniteBookSearchQuery";
import AppLayout from "@/layouts/AppLayout";
import type { SearchTarget } from "@/types/search";

const isValidSearchTarget = (target: string | null): target is SearchTarget => {
  return target === "title" || target === "person" || target === "publisher";
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") ?? "";
  const initialTarget = searchParams.get("target");

  const [keyword, setKeyword] = useState(initialQuery);
  const [submittedKeyword, setSubmittedKeyword] = useState(initialQuery);
  const [target, setTarget] = useState<SearchTarget | undefined>(
    isValidSearchTarget(initialTarget) ? initialTarget : undefined,
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteBookSearchQuery({
    query: submittedKeyword,
    target,
  });

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = error ? 0 : (data?.pages[0]?.meta.total_count ?? 0);
  const isInitialLoading = isLoading || (isFetching && books.length === 0);

  const handleSearch = ({
    keyword,
    target,
  }: {
    keyword: string;
    target?: SearchTarget;
  }) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    setSubmittedKeyword(trimmedKeyword);
    setTarget(target);

    const nextParams = new URLSearchParams();
    nextParams.set("query", trimmedKeyword);

    if (target) {
      nextParams.set("target", target);
    }

    setSearchParams(nextParams);
  };

  const hasSearched = submittedKeyword.trim().length > 0;

  return (
    <AppLayout title={NAV_ITEMS.search.name}>
      <SearchSection
        keyword={keyword}
        onChangeKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {hasSearched && (
        <ResultCount>
          도서 검색 결과 &nbsp;&nbsp; 총 <Count>{totalCount}</Count>건
        </ResultCount>
      )}

      {hasSearched && isInitialLoading && <BookCardSkeleton count={10} />}

      {hasSearched && !isInitialLoading && error && (
        <ErrorStatus text={getBookSearchErrorMessage(error)} />
      )}

      {hasSearched && !isInitialLoading && !error && (
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
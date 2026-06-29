import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
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

  // URL에서 직접 검색 파라미터 읽기 (derived state)
  const queryFromUrl = searchParams.get("query") ?? "";
  const targetFromUrl = searchParams.get("target");
  
  const submittedKeyword = queryFromUrl;
  const target = isValidSearchTarget(targetFromUrl) ? targetFromUrl : undefined;

  // 사용자 입력용 로컬 state (URL과 동기화)
  const [keyword, setKeyword] = useState(queryFromUrl);

  // URL이 변경되면 입력 필드도 동기화 (뒤로가기 등)
  // URL은 외부 시스템이므로 이 패턴은 정당함
  useEffect(() => {
    if (keyword !== queryFromUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setKeyword(queryFromUrl);
    }
    // keyword는 의도적으로 제외 (무한 루프 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFromUrl]);

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

  const books = useMemo(
    () => data?.pages.flatMap((page) => page.documents) ?? [],
    [data]
  );

  const totalCount = error ? 0 : data?.pages[0]?.meta.total_count ?? 0;
  const isInitialLoading = isLoading || (isFetching && books.length === 0);
  const hasSearched = submittedKeyword.trim().length > 0;

  const handleSearch = ({
    keyword,
    target,
  }: {
    keyword: string;
    target?: SearchTarget;
  }) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    const nextParams = new URLSearchParams();
    nextParams.set("query", trimmedKeyword);

    if (target) {
      nextParams.set("target", target);
    }

    setSearchParams(nextParams);
  };

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
  ...theme.typography.caption,
  marginBottom: "36px",
}));

const Count = styled.span(({ theme }) => ({
  color: theme.colors.palette.primary,
}));

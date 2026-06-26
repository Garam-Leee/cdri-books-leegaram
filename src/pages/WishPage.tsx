import styled from "@emotion/styled";
import { useMemo, useState } from "react";

import BookList from "@/components/book/BookList";
import { NAV_ITEMS } from "@/constants/nav";
import { STORAGE_KEYS } from "@/constants/storage";
import AppLayout from "@/layouts/AppLayout";
import type { Book } from "@/types/book";

const PAGE_SIZE = 10;

export default function WishPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>(getFavoriteBooks);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleBooks = useMemo(
    () => favoriteBooks.slice(0, visibleCount),
    [favoriteBooks, visibleCount]
  );

  const handleFavoriteChange = (book: Book, isFavorite: boolean) => {
    if (isFavorite) return;

    setFavoriteBooks((prevFavoriteBooks) =>
      prevFavoriteBooks.filter(
        (favoriteBook) => favoriteBook.isbn !== book.isbn
      )
    );
  };

  return (
    <AppLayout title={NAV_ITEMS.wish.name}>
      <ResultCount>
        찜한 책 &nbsp;&nbsp; 총 <Count>{favoriteBooks.length}</Count>건
      </ResultCount>

      <BookList
        books={visibleBooks}
        emptyText="찜한 책이 없습니다."
        hasMore={visibleCount < favoriteBooks.length}
        onLoadMore={() => setVisibleCount((prevCount) => prevCount + PAGE_SIZE)}
        onFavoriteChange={handleFavoriteChange}
      />
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

const getFavoriteBooks = () => {
  const storedFavoriteBooks = localStorage.getItem(STORAGE_KEYS.FAVORITE_BOOKS);
  return storedFavoriteBooks ? (JSON.parse(storedFavoriteBooks) as Book[]) : [];
};

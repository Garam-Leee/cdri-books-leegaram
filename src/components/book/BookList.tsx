import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import NoResultBookImage from "@/assets/images/img-noresult-book.png";
import BookCard from "@/components/book/BookCard";
import { EmptyStatus } from "@/components/common";
import type { Book } from "@/types/book";

interface BookListProps {
  books: Book[];
  emptyText?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onFavoriteChange?: (book: Book, isFavorite: boolean) => void;
}

export default function BookList({
  books,
  emptyText = "검색된 결과가 없습니다.",
  hasMore = false,
  onLoadMore,
  onFavoriteChange,
}: BookListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observedRef.current || !hasMore || !onLoadMore) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    });

    observerRef.current.observe(observedRef.current);

    return () => observerRef.current?.disconnect();
  }, [books, hasMore, onLoadMore]);

  if (books.length === 0) {
    return <EmptyStatus icon={NoResultBookImage} text={emptyText} />;
  }

  return (
    <>
      <List
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
            },
          },
        }}
      >
        {books.map((book) => (
          <BookCard
            key={book.isbn || book.url}
            book={book}
            onFavoriteChange={onFavoriteChange}
          />
        ))}
      </List>

      {onLoadMore && <ObservedArea ref={observedRef} />}
    </>
  );
}

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
`;

const ObservedArea = styled.div`
  height: 1px;
  margin-top: 192px;
`;

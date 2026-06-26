import styled from "@emotion/styled";
import { useState } from "react";

import ArrowDownIcon from "@/assets/icons/ic-arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/ic-arrow-up.svg";
import HeartFillIcon from "@/assets/icons/ic-heart-fill.svg";
import HeartIcon from "@/assets/icons/ic-heart.svg";
import { STORAGE_KEYS } from "@/constants/storage";
import type { Book } from "@/types/book";
import { formatPrice } from "@/utils/format";
import { splitLines } from "@/utils/text";

interface BookCardProps {
  book: Book;
  onFavoriteChange?: (book: Book, isFavorite: boolean) => void;
}

export default function BookCard({ book, onFavoriteChange }: BookCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => isFavoriteBook(book));

  const displayPrice = book.sale_price > 0 ? book.sale_price : book.price;

  const handleBuyClick = () => {
    window.open(book.url, "_blank", "noopener,noreferrer");
  };

  const handleFavoriteClick = () => {
    const favoriteBooks = getFavoriteBooks();
    const nextIsFavorite = !isFavorite;

    const nextFavoriteBooks = nextIsFavorite
      ? [
          book,
          ...favoriteBooks.filter(
            (favoriteBook) => favoriteBook.isbn !== book.isbn
          ),
        ]
      : favoriteBooks.filter((favoriteBook) => favoriteBook.isbn !== book.isbn);

    localStorage.setItem(
      STORAGE_KEYS.FAVORITE_BOOKS,
      JSON.stringify(nextFavoriteBooks)
    );

    setIsFavorite(nextIsFavorite);
    onFavoriteChange?.(book, nextIsFavorite);
  };

  return (
    <Item isOpen={isOpen}>
      <LeftArea isOpen={isOpen}>
        <ThumbnailArea>
          <Thumbnail
            src={book.thumbnail || "/favicon.svg"}
            alt={`${book.title} 표지`}
            isOpen={isOpen}
          />

          <FavoriteButton
            type="button"
            isOpen={isOpen}
            aria-label={isFavorite ? "찜 해제" : "찜하기"}
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon
              src={isFavorite ? HeartFillIcon : HeartIcon}
              alt=""
              aria-hidden="true"
            />
          </FavoriteButton>
        </ThumbnailArea>

        <Info isOpen={isOpen}>
          <TitleRow>
            <Title>{book.title}</Title>
            <Authors>{book.authors.join(", ")}</Authors>
          </TitleRow>

          {isOpen && (
            <Description>
              <DescriptionTitle>책 소개</DescriptionTitle>

              <DescriptionContent>
                {splitLines(book.contents).map((line, index) => (
                  <p key={`${line}-${index}`}>{line}</p>
                ))}
              </DescriptionContent>
            </Description>
          )}
        </Info>
      </LeftArea>

      <RightArea isOpen={isOpen}>
        <PriceArea isOpen={isOpen}>
          {isOpen && book.sale_price > 0 && (
            <PriceRow>
              <PriceLabel>원가</PriceLabel>
              <OriginalPrice>{formatPrice(book.price)}</OriginalPrice>
            </PriceRow>
          )}

          <PriceRow>
            {isOpen && (
              <PriceLabel>{book.sale_price > 0 ? "할인가" : "원가"}</PriceLabel>
            )}
            <SalePrice>{formatPrice(displayPrice)}</SalePrice>
          </PriceRow>
        </PriceArea>

        <ButtonArea isOpen={isOpen}>
          <BuyButton type="button" isOpen={isOpen} onClick={handleBuyClick}>
            구매하기
          </BuyButton>

          <DetailButton
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <DetailButtonContent>
              상세보기
              <ArrowIcon
                src={isOpen ? ArrowUpIcon : ArrowDownIcon}
                alt=""
                aria-hidden="true"
              />
            </DetailButtonContent>
          </DetailButton>
        </ButtonArea>
      </RightArea>
    </Item>
  );
}

const getFavoriteBooks = () => {
  const storedFavoriteBooks = localStorage.getItem(STORAGE_KEYS.FAVORITE_BOOKS);

  return storedFavoriteBooks ? (JSON.parse(storedFavoriteBooks) as Book[]) : [];
};

const isFavoriteBook = (book: Book) =>
  getFavoriteBooks().some((favoriteBook) => favoriteBook.isbn === book.isbn);

const Item = styled.li<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: "960px",
  height: isOpen ? "344px" : "100px",
  display: "flex",
  justifyContent: "space-between",
  gap: "56px",
  marginTop: "9px",
  padding: isOpen ? "24px 16px 40px 48px" : "0 16px 0 48px",
  borderBottom: `1px solid ${theme.colors.palette.gray}`,
}));

const LeftArea = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  flex: 1,
  alignItems: isOpen ? "flex-start" : "center",
  minWidth: 0,
}));

const ThumbnailArea = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Thumbnail = styled.img<{ isOpen: boolean }>(({ isOpen }) => ({
  width: isOpen ? "210px" : "48px",
  height: isOpen ? "280px" : "68px",
  objectFit: "cover",
}));

const FavoriteButton = styled.button<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  top: isOpen ? "4px" : "1.5px",
  right: isOpen ? "4px" : "2px",
  width: isOpen ? "24px" : "16px",
  height: isOpen ? "24px" : "16px",
}));

const FavoriteIcon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Info = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  marginLeft: isOpen ? "32px" : "48px",
  paddingTop: isOpen ? "20px" : 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: isOpen ? "flex-start" : "center",
  minWidth: 0,
}));

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

const Title = styled.p(({ theme }) => ({
  maxWidth: "290px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: theme.colors.text.primary,
  ...theme.typography.title3,
}));

const Authors = styled.p(({ theme }) => ({
  marginLeft: "16px",
  color: theme.colors.text.subtitle,
  whiteSpace: "nowrap",
  ...theme.typography.body2,
}));

const Description = styled.div`
  margin-top: 16px;
`;

const DescriptionTitle = styled.p(({ theme }) => ({
  marginBottom: "12px",
  color: theme.colors.text.primary,
  ...theme.typography.body2Bold,
}));

const DescriptionContent = styled.div(({ theme }) => ({
  width: "360px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: theme.colors.text.primary,
  ...theme.typography.small,
}));

const RightArea = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: isOpen ? "relative" : "static",
  display: "flex",
  flexDirection: isOpen ? "column" : "row",
  alignItems: isOpen ? "flex-end" : "center",
  flexShrink: 0,
}));

const PriceArea = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: isOpen ? "absolute" : "static",
  right: 0,
  bottom: isOpen ? "82px" : "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  marginRight: isOpen ? 0 : "56px",
}));

const PriceRow = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;

  & + & {
    margin-top: 8px;
  }
`;

const PriceLabel = styled.span(({ theme }) => ({
  paddingTop: "2px",
  color: theme.colors.text.subtitle,
  ...theme.typography.small,
}));

const OriginalPrice = styled.span(({ theme }) => ({
  color: theme.colors.text.primary,
  textDecoration: "line-through",
  ...theme.typography.title3,
  fontWeight: 300,
}));

const SalePrice = styled.span(({ theme }) => ({
  color: theme.colors.text.primary,
  ...theme.typography.title3,
}));

const ButtonArea = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  height: isOpen ? "100%" : "auto",
  display: "flex",
  flexDirection: isOpen ? "column-reverse" : "row",
  alignItems: isOpen ? "flex-end" : "center",
  justifyContent: isOpen ? "space-between" : "flex-start",
  gap: isOpen ? 0 : "8px",
}));

const BuyButton = styled.button<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? "240px" : "115px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.primary,
  color: theme.colors.palette.white,
  ...theme.typography.body2Bold,
}));

const DetailButton = styled.button(({ theme }) => ({
  width: "115px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.lightGray,
  color: theme.colors.text.secondary,
  ...theme.typography.body2Bold,
}));

const DetailButtonContent = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  display: block;
`;

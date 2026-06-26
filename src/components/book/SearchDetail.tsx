import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

import { SEARCH_TARGET_OPTIONS } from "@/constants/search";
import type { SearchTarget } from "@/types/search";

interface SearchDetailProps {
  keyword: string;
  target: SearchTarget;
  onChangeKeyword: (value: string) => void;
  onChangeTarget: (value: SearchTarget) => void;
  onSearch: () => void;
  onClose: () => void;
}

export default function SearchDetail({
  keyword,
  target,
  onChangeKeyword,
  onChangeTarget,
  onSearch,
  onClose,
}: SearchDetailProps) {
  const [isComposing, setIsComposing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!popupRef.current) return;

      if (!popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (isComposing) return;

    onSearch();
  };

  return (
    <Container ref={popupRef}>
      <CloseButton type="button" onClick={onClose} aria-label="상세검색 닫기">
        ×
      </CloseButton>

      <FieldRow>
        <SelectBox>
          <Select
            value={target}
            onChange={(event) =>
              onChangeTarget(event.target.value as SearchTarget)
            }
          >
            {SEARCH_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </SelectBox>

        <KeywordInput
          value={keyword}
          placeholder="검색어 입력"
          onChange={(event) => onChangeKeyword(event.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
        />
      </FieldRow>

      <SearchButton type="button" onClick={onSearch} disabled={!keyword.trim()}>
        검색하기
      </SearchButton>
    </Container>
  );
}

const Container = styled.div(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: 0,
  zIndex: 20,
  width: "360px",
  height: "160px",
  transform: "translate(-50%, calc(100% + 10px))",
  padding: "36px 24px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.white,
  boxShadow: "0px 4px 14px 6px rgba(151, 151, 151, 0.15)",
}));

const FieldRow = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 0 16px;
`;

const SelectBox = styled.div(({ theme }) => ({
  position: "relative",
  width: "100px",
  flexShrink: 0,
  borderBottom: `1px solid ${theme.colors.palette.gray}`,

  "&::after": {
    content: '""',
    position: "absolute",
    top: "5px",
    right: "2px",
    width: "7px",
    height: "7px",
    borderRight: `1.5px solid ${theme.colors.text.subtitle}`,
    borderBottom: `1.5px solid ${theme.colors.text.subtitle}`,
    transform: "rotate(45deg)",
    pointerEvents: "none",
  },
}));

const Select = styled.select(({ theme }) => ({
  display: "block",
  width: "100%",
  padding: "0 18px 6px 0",
  border: "none",
  outline: "none",
  appearance: "none",
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  cursor: "pointer",
  ...theme.typography.body2,
}));

const KeywordInput = styled.input(({ theme }) => ({
  display: "block",
  width: "100%",
  minWidth: 0,
  paddingBottom: "6px",
  paddingLeft: "9px",
  border: "none",
  borderBottom: `1px solid ${theme.colors.palette.primary}`,
  outline: "none",
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  ...theme.typography.body2,

  "&::placeholder": {
    color: theme.colors.text.subtitle,
  },
}));

const SearchButton = styled.button(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.primary,
  color: theme.colors.palette.white,
  ...theme.typography.body2Bold,

  "&:disabled": {
    backgroundColor: theme.colors.palette.gray,
    cursor: "not-allowed",
  },
}));

const CloseButton = styled.button({
  position: "absolute",
  top: "8px",
  right: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  color: "#B1B8C0",
  fontSize: "20px",
  lineHeight: "20px",
});

import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import SearchDetail from "@/components/book/SearchDetail";
import SearchHistory from "@/components/book/SearchHistory";
import SearchInput from "@/components/book/SearchInput";
import {
  SEARCH_HISTORY_STORAGE_KEY,
  SEARCH_TARGET_OPTIONS,
} from "@/constants/search";
import type { SearchTarget } from "@/types/search";

interface SearchSectionProps {
  keyword: string;
  onChangeKeyword: (value: string) => void;
  onSearch: (params: { keyword: string; target?: SearchTarget }) => void;
}

export default function SearchSection({
  keyword,
  onChangeKeyword,
  onSearch,
}: SearchSectionProps) {
  const [histories, setHistories] = useState<string[]>(() => {
    const storedHistories = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    return storedHistories ? JSON.parse(storedHistories) : [];
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailKeyword, setDetailKeyword] = useState("");
  const [searchTarget, setSearchTarget] = useState<SearchTarget>(
    SEARCH_TARGET_OPTIONS[0].value,
  );

  const isHistoryOpen = isFocused && histories.length > 0;

  const updateHistory = (nextKeyword: string) => {
    const trimmedKeyword = nextKeyword.trim();
    if (!trimmedKeyword) return;

    const nextHistories = [
      trimmedKeyword,
      ...histories.filter((history) => history !== trimmedKeyword),
    ].slice(0, 8);

    setHistories(nextHistories);
    localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(nextHistories),
    );
  };

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    updateHistory(trimmedKeyword);
    onSearch({ keyword: trimmedKeyword });

    setIsFocused(false);
    setIsDetailOpen(false);
    setDetailKeyword("");
    setSearchTarget(SEARCH_TARGET_OPTIONS[0].value);
  };

  const handleDetailSearch = () => {
    const trimmedKeyword = detailKeyword.trim();
    if (!trimmedKeyword) return;

    onChangeKeyword("");
    onSearch({
      keyword: trimmedKeyword,
      target: searchTarget,
    });

    setIsDetailOpen(false);
    setIsFocused(false);
  };

  const handleSelectHistory = (history: string) => {
    onChangeKeyword(history);
    onSearch({ keyword: history });
    setIsFocused(false);
    setIsDetailOpen(false);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setDetailKeyword("");
    setSearchTarget(SEARCH_TARGET_OPTIONS[0].value);
  };

  return (
    <Container>
      <SearchBox>
        <InputArea
          onFocus={() => {
            if (histories.length > 0) setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        >
          <SearchInput
            value={keyword}
            onChange={onChangeKeyword}
            onEnter={handleSearch}
            isHistoryOpen={isHistoryOpen}
          />

          <AnimatePresence>
            {isHistoryOpen && (
              <SearchHistory
                histories={histories}
                setHistories={setHistories}
                onSelect={handleSelectHistory}
              />
            )}
          </AnimatePresence>
        </InputArea>

        <DetailArea>
          <DetailButton
            type="button"
            aria-expanded={isDetailOpen}
            onClick={() => setIsDetailOpen((prev) => !prev)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          >
            상세검색
          </DetailButton>

          <AnimatePresence>
            {isDetailOpen && (
              <SearchDetail
                keyword={detailKeyword}
                target={searchTarget}
                onChangeKeyword={setDetailKeyword}
                onChangeTarget={setSearchTarget}
                onSearch={handleDetailSearch}
                onClose={handleCloseDetail}
              />
            )}
          </AnimatePresence>
        </DetailArea>
      </SearchBox>
    </Container>
  );
}

const Container = styled.section`
  width: 568px;
  max-width: 100%;
  padding-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputArea = styled.div`
  position: relative;
  width: 480px;
  max-width: 100%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const DetailArea = styled.div`
  position: relative;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const DetailButton = styled(motion.button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  border: `1px solid ${theme.colors.text.subtitle}`,
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: theme.colors.text.subtitle,
  whiteSpace: "nowrap",
  transition:
    "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
  ...theme.typography.body2,

  "&:hover": {
    borderColor: theme.colors.palette.primary,
    color: theme.colors.palette.primary,
    backgroundColor: "rgba(72, 128, 238, 0.06)",
  },

  '&[aria-expanded="true"]': {
    borderColor: theme.colors.palette.primary,
    color: theme.colors.palette.primary,
    backgroundColor: "rgba(72, 128, 238, 0.06)",
  },
}));
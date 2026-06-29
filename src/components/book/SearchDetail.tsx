import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import ArrowDownIcon from "@/assets/icons/ic-arrow-down.svg";
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

const getTargetLabel = (target: SearchTarget) =>
  SEARCH_TARGET_OPTIONS.find((option) => option.value === target)?.label ??
  "제목";

export default function SearchDetail({
  keyword,
  target,
  onChangeKeyword,
  onChangeTarget,
  onSearch,
  onClose,
}: SearchDetailProps) {
  const [isTargetOpen, setIsTargetOpen] = useState(false);
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

  const handleSubmit = () => {
    if (!keyword.trim()) return;
    onSearch();
  };

  return (
    <PopupRoot
      ref={popupRef}
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <CloseButton type="button" aria-label="상세검색 닫기" onClick={onClose}>
        ×
      </CloseButton>

      <PopupContent>
        <Row>
          <TargetField>
            <TargetButton
              type="button"
              onClick={() => setIsTargetOpen((prev) => !prev)}
            >
              <span>{getTargetLabel(target)}</span>

              <ArrowIcon
                src={ArrowDownIcon}
                alt=""
                aria-hidden="true"
                animate={{ rotate: isTargetOpen ? 180 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </TargetButton>

            <AnimatePresence>
              {isTargetOpen && (
                <TargetOptions
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                >
                  {SEARCH_TARGET_OPTIONS.filter(
                    (option) => option.value !== target,
                  ).map((option) => (
                    <TargetOption
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChangeTarget(option.value);
                        setIsTargetOpen(false);
                      }}
                    >
                      {option.label}
                    </TargetOption>
                  ))}
                </TargetOptions>
              )}
            </AnimatePresence>
          </TargetField>

          <DetailInput
            value={keyword}
            placeholder="검색어 입력"
            onChange={(event) => onChangeKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              if (event.nativeEvent.isComposing) return;

              event.preventDefault();
              handleSubmit();
            }}
          />
        </Row>

        <SubmitButton
          type="button"
          onClick={handleSubmit}
          disabled={!keyword.trim()}
        >
          검색하기
        </SubmitButton>
      </PopupContent>
    </PopupRoot>
  );
}

const PopupRoot = styled(motion.div)(({ theme }) => ({
  zIndex: 30,
  width: "360px",
  maxWidth: "calc(100vw - 32px)",
  left: "50%",
  display: "grid",
  marginLeft: "-180px",
  position: "absolute",
  top: "calc(100% + 1rem)",
  padding: "44px 24px 36px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.white,
  boxShadow: "0 4px 14px 6px rgba(151, 151, 151, 0.15)",

  "@media (max-width: 480px)": {
    left: "0",
    marginLeft: "0",
    transform: "none",
  },
}));

const CloseButton = styled.button({
  top: "8px",
  right: "8px",
  width: "20px",
  height: "20px",
  padding: 0,
  border: "none",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  color: "#B1B8C0",
  fontSize: "20px",
  lineHeight: "20px",
  backgroundColor: "transparent",
});

const PopupContent = styled.div({
  gap: "16px",
  display: "grid",
});

const Row = styled.div({
  gap: "4px",
  display: "flex",
  alignItems: "flex-start",
});

const TargetField = styled.div({
  width: "100px",
  flexShrink: 0,
  position: "relative",
});

const TargetButton = styled.button(({ theme }) => ({
  gap: "8px",
  height: "36px",
  width: "100%",
  border: "none",
  display: "flex",
  padding: "0 8px",
  cursor: "pointer",
  textAlign: "left",
  alignItems: "center",
  color: theme.colors.text.primary,
  backgroundColor: "transparent",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.colors.palette.gray}`,
  ...theme.typography.body2Bold,
}));

const ArrowIcon = styled(motion.img)({
  width: "16px",
  height: "8px",
  opacity: 0.5,
});

const TargetOptions = styled(motion.div)(({ theme }) => ({
  top: "40px",
  left: 0,
  width: "100px",
  zIndex: 30,
  display: "grid",
  overflow: "hidden",
  position: "absolute",
  backgroundColor: theme.colors.palette.white,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
}));

const TargetOption = styled.button(({ theme }) => ({
  height: "32px",
  width: "100%",
  border: "none",
  display: "flex",
  padding: "0 8px",
  cursor: "pointer",
  textAlign: "left",
  alignItems: "center",
  backgroundColor: "transparent",
  color: theme.colors.text.subtitle,
  transition: "background-color 160ms ease",
  ...theme.typography.body2 ,

  "&:hover": {
    backgroundColor: theme.colors.palette.lightGray,
  },
}));

const DetailInput = styled.input(({ theme }) => ({
  width: "208px",
  height: "36px",
  paddingLeft: "8px",
  border: "none",
  outline: "none",
  color: theme.colors.text.primary,
  borderBottom: `1px solid ${theme.colors.palette.primary}`,
  ...theme.typography.caption,

  "&::placeholder": {
    color: theme.colors.text.subtitle,
    ...theme.typography.caption,
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },

}));

const SubmitButton = styled.button(({ theme }) => ({
  width: "312px",
  height: "36px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.primary,
  color: theme.colors.palette.white,
  ...theme.typography.body2,

  "&:disabled": {
    backgroundColor: theme.colors.palette.gray,
    cursor: "not-allowed",
  },
  textAlign: "center",
}));
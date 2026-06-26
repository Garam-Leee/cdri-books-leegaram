import styled from "@emotion/styled";

import SearchIcon from "@/assets/icons/ic-search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  isHistoryOpen?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onEnter,
  isHistoryOpen = false,
}: SearchInputProps) {
  return (
    <Container isHistoryOpen={isHistoryOpen}>
      <IconWrap>
        <Icon src={SearchIcon} alt="" aria-hidden="true" />
      </IconWrap>

      <Input
        type="text"
        value={value}
        placeholder="검색어를 입력하세요"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onEnter();
        }}
      />
    </Container>
  );
}

const Container = styled.div<{ isHistoryOpen: boolean }>(
  ({ theme, isHistoryOpen }) => ({
    position: "relative",
    width: "480px",
    padding: "10px 10px 10px 48px",
    borderRadius: isHistoryOpen ? "22px 22px 0 0" : "22px",
    backgroundColor: theme.colors.palette.lightGray,
  }),
);

const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  display: flex;
  transform: translateY(-50%);
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const Input = styled.input(({ theme }) => ({
  display: "block",
  width: "100%",
  minWidth: 0,
  border: "none",
  outline: "none",
  boxShadow: "none",
  backgroundColor: "transparent",
  color: theme.colors.text.subtitle,
  ...theme.typography.caption,

  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },

  "&::placeholder": {
    color: theme.colors.text.subtitle,
  },
}));
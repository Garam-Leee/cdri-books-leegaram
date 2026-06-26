import styled from "@emotion/styled";

import DeleteIcon from "@/assets/icons/ic-delete.svg";
import { SEARCH_HISTORY_STORAGE_KEY } from "@/constants/search";

interface SearchHistoryProps {
  histories: string[];
  onSelect: (keyword: string) => void;
  setHistories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SearchHistory({
  histories,
  onSelect,
  setHistories,
}: SearchHistoryProps) {
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    keyword: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const nextHistories = histories.filter((history) => history !== keyword);

    setHistories(nextHistories);
    localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(nextHistories)
    );
  };

  return (
    <Container onMouseDown={(event) => event.preventDefault()}>
      {histories.map((history) => (
        <Item key={history}>
          <Keyword type="button" onClick={() => onSelect(history)}>
            {history}
          </Keyword>

          <DeleteButton
            type="button"
            aria-label={`${history} 검색 기록 삭제`}
            onClick={(event) => handleDelete(event, history)}
          >
            <DeleteImage src={DeleteIcon} alt="" aria-hidden="true" />
          </DeleteButton>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.ul(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 10,
  width: "100%",
  padding: "0 24px 8px 48px",
  borderRadius: "0 0 22px 22px",
  backgroundColor: theme.colors.palette.lightGray,
}));

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
`;

const Keyword = styled.button(({ theme }) => ({
  width: "83.3333%",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  textAlign: "left",
  color: theme.colors.text.subtitle,
  ...theme.typography.caption,

  "&:hover": {
    color: theme.colors.text.primary,
  },
}));

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const DeleteImage = styled.img`
  width: 16px;
  height: 16px;
  display: block;
  opacity: 0.5;
`;

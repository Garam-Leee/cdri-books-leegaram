import styled from "@emotion/styled";

interface BookCardSkeletonProps {
  count?: number;
}

export default function BookCardSkeleton({ count = 3 }: BookCardSkeletonProps) {
  return (
    <List aria-label="도서 검색 결과 로딩 중">
      {Array.from({ length: count }).map((_, index) => (
        <Item key={index}>
          <LeftArea>
            <Thumbnail />
            <Info>
              <TitleLine />
              <AuthorLine />
            </Info>
          </LeftArea>

          <RightArea>
            <PriceLine />
            <ButtonGroup>
              <BuyButton />
              <DetailButton />
            </ButtonGroup>
          </RightArea>
        </Item>
      ))}
    </List>
  );
}

const shimmer = `
  background: linear-gradient(
    90deg,
    #F2F4F6 0%,
    #E7EAEE 50%,
    #F2F4F6 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li(({ theme }) => ({
  width: "960px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "56px",
  marginTop: "9px",
  padding: "0 16px 0 48px",
  borderBottom: `1px solid ${theme.colors.palette.gray}`,
}));

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const Thumbnail = styled.div`
  width: 48px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 4px;
  ${shimmer}
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-left: 48px;
  min-width: 0;
`;

const TitleLine = styled.div`
  width: 180px;
  height: 18px;
  border-radius: 8px;
  ${shimmer}
`;

const AuthorLine = styled.div`
  width: 120px;
  height: 14px;
  margin-left: 16px;
  border-radius: 8px;
  ${shimmer}
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const PriceLine = styled.div`
  width: 100px;
  height: 18px;
  margin-right: 56px;
  border-radius: 8px;
  ${shimmer}
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BuyButton = styled.div(({ theme }) => ({
  width: "115px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.primary,
  opacity: 0.65,
}));

const DetailButton = styled.div(({ theme }) => ({
  width: "115px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.lightGray,
}));
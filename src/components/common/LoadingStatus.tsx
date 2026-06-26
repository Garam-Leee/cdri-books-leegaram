import styled from "@emotion/styled";

interface LoadingStatusProps {
  text?: string;
}

export default function LoadingStatus({
  text = "로딩중...",
}: LoadingStatusProps) {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;

const Text = styled.p(({ theme }) => ({
  color: "#B8BFC9",
  ...theme.typography.caption,
}));

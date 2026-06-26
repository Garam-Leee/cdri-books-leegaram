import styled from "@emotion/styled";

interface ErrorStatusProps {
  text?: string;
}

export default function ErrorStatus({
  text = "오류가 발생했습니다",
}: ErrorStatusProps) {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 16px;
`;

const Text = styled.p(({ theme }) => ({
  color: theme.colors.palette.red,
  ...theme.typography.caption,
}));

import styled from "@emotion/styled";

interface EmptyStatusProps {
  icon: string;
  text: string;
}

export default function EmptyStatus({ icon, text }: EmptyStatusProps) {
  return (
    <Container>
      <Icon src={icon} alt="빈 아이콘" />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 16px;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

const Text = styled.p(({ theme }) => ({
  color: "#B8BFC9",
  ...theme.typography.caption,
}));

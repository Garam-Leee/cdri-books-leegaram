import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";

interface AppLayoutProps extends PropsWithChildren {
  title: string;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <section>{children}</section>
    </Container>
  );
}

const Container = styled.main`
  width: 960px;
  max-width: 100%;
  margin: 0 auto;
  padding: 80px 0 240px;

  @media (max-width: 960px) {
    width: 100%;
    padding: 80px 16px 240px;
  }
`;

const Title = styled.h2(({ theme }) => ({
  marginBottom: "20px",
  color: theme.colors.text.primary,
  ...theme.typography.title2,
}));

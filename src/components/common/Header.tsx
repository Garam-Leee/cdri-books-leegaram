import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

import { NAV_ITEMS } from "@/constants/nav";

export default function Header() {
  const location = useLocation();

  return (
    <Container>
      <Title>CERTICOS BOOKS</Title>

      <Navigation aria-label="주요 메뉴">
        {Object.values(NAV_ITEMS).map((item) => (
          <NavItem key={item.id}>
            <NavLink
              to={item.path}
              data-active={location.pathname === item.path}
            >
              {item.name}
            </NavLink>
          </NavItem>
        ))}
      </Navigation>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  padding: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Title = styled.h1(({ theme }) => ({
  color: theme.colors.text.primary,
  ...theme.typography.title1,
}));

const Navigation = styled.nav`
  display: flex;
  gap: 56px;
  margin: 0 auto;
  transform: translateX(-200px);

  @media (max-width: 960px) {
    transform: none;
    margin: 0;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    margin: 0;
    gap: 24px;
  }
`;

const NavItem = styled.div``;

const NavLink = styled(Link)(({ theme }) => ({
  display: "block",
  padding: "4px 0",
  borderBottom: "1px solid transparent",
  color: theme.colors.text.primary,
  textDecoration: "none",
  transition: "border-color 0.3s ease",
  ...theme.typography.body1,

  '&[data-active="true"]': {
    borderBottomColor: theme.colors.palette.primary,
  },
}));

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NAV_ITEMS } from "@/constants/nav";
import AppLayout from "@/layouts/AppLayout";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          window.clearInterval(timer);
          navigate("/", { replace: true });
          return 0;
        }

        return prevCount - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [navigate]);

  return (
    <AppLayout title={NAV_ITEMS.search.name}>
      <Container
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <ErrorCode>404</ErrorCode>

        <Title>페이지를 찾을 수 없습니다</Title>

        <Message>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          <br />
          <Countdown>{countdown}</Countdown>초 후 도서 검색 페이지로 이동합니다.
        </Message>

        <HomeButton type="button" onClick={() => navigate("/", { replace: true })}>
          바로 이동하기
        </HomeButton>
      </Container>
    </AppLayout>
  );
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 16px;
  text-align: center;
`;

const ErrorCode = styled.h1(({ theme }) => ({
  marginBottom: "16px",
  color: theme.colors.palette.primary,
  fontFamily: "Noto Sans KR",
  fontSize: "120px",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-2px",
}));

const Title = styled.h2(({ theme }) => ({
  marginBottom: "12px",
  color: theme.colors.text.primary,
  ...theme.typography.title1,
}));

const Message = styled.p(({ theme }) => ({
  ...theme.typography.body1,
  marginBottom: "32px",
  color: theme.colors.text.secondary,
  lineHeight: 1.6,
}));

const Countdown = styled.span(({ theme }) => ({
  color: theme.colors.palette.primary,
  fontWeight: 700,
}));

const HomeButton = styled.button(({ theme }) => ({
  width: "240px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 32px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: theme.colors.palette.primary,
  color: theme.colors.palette.white,
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  ...theme.typography.body2Bold,

  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 16px rgba(72, 128, 238, 0.2)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));
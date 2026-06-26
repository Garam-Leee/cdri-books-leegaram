import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@/components/common/Header";
import HomePage from "@/pages/HomePage";
import WishPage from "@/pages/WishPage";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wish" element={<WishPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
`;

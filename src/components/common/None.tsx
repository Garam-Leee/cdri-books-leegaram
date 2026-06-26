import styled from "@emotion/styled";

import NoResultBookImage from "@/assets/images/img-noresult-book.png";

interface NoneProps {
  text?: string;
}

export default function None({ text = "" }: NoneProps) {
  return (
    <Container>
      <Content>
        <Image src={NoResultBookImage} alt="" role="presentation" />
        <Text>{text}</Text>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Image = styled.img`
  width: 80px;
  aspect-ratio: 1;
`;

const Text = styled.p(({ theme }) => ({
  color: theme.colors.text.secondary,
  ...theme.typography.caption,
}));

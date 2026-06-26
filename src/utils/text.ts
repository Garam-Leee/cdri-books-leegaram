export const splitLines = (text: string, maxLength = 220) => {
  if (!text) return ["소개 정보가 없습니다."];

  const slicedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return slicedText.split("\n");
};

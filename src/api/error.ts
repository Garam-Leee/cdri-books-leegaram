export type ApiErrorType =
  | "auth"
  | "quota"
  | "invalid-request"
  | "network"
  | "unknown";

export interface ApiError extends Error {
  type: ApiErrorType;
  status?: number;
  code?: number;
}

export const createApiError = ({
  message,
  type = "unknown",
  status,
  code,
}: {
  message: string;
  type?: ApiErrorType;
  status?: number;
  code?: number;
}) => {
  const error = new Error(message) as ApiError;

  error.type = type;
  error.status = status;
  error.code = code;

  return error;
};

export const mapKakaoErrorType = (
  code?: number,
  status?: number
): ApiErrorType => {
  if (status === 401 || code === -401 || code === -3 || code === -5) {
    return "auth";
  }

  if (code === -10 || code === -11) {
    return "quota";
  }

  if (code === -2 || code === -6 || code === -9) {
    return "invalid-request";
  }

  if (status && status >= 500) {
    return "network";
  }

  return "unknown";
};

const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && "type" in error;
};

export const getBookSearchErrorMessage = (error: unknown) => {
  if (!isApiError(error)) {
    return "도서 검색 중 알 수 없는 오류가 발생했습니다.";
  }

  switch (error.type) {
    case "auth":
      return "API Key 설정을 확인해 주세요.";

    case "quota":
      return "API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.";

    case "invalid-request":
      return "검색 요청이 올바르지 않습니다. 검색어를 다시 확인해 주세요.";

    case "network":
      return "네트워크 연결이 불안정합니다. 인터넷 연결을 확인한 후 다시 시도해 주세요.";

    case "unknown":
    default:
      return "도서 검색 중 오류가 발생했습니다.";
  }
};

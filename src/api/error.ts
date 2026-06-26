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

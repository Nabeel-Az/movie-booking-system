export interface ApiResponse<T, K extends string = "data"> {
  status: number;
  payload: {
    [key in K]: T;
  } & {
    error: string | null;
  };
  errorMsg: string | null;
}

export interface ApiResponseBase<> {
  success: number;
  message: string | null;
}

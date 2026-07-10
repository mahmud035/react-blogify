/** Uniform success envelope returned by every API endpoint. */
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

/** Error envelope shape (globalErrorHandler). */
export interface ApiErrorBody {
  statusCode: number;
  success: false;
  message: string;
  errorSources?: { path: string; message: string }[];
}

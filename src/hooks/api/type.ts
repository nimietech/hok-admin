export interface ApiResponse<T = any>{
  data?: T;
  responseCode: string;
  responseMessage: string;
}


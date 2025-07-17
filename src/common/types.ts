export type SuccessResponse<T> = {
    success: boolean;
    data: {
      [key: string]: T;
    };
  };
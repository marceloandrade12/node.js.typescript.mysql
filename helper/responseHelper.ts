/**
 * Method to generate sucess response
 * @param responseData response to be handle
 * @returns
 */
export const sendSuccessResponse = <T>(
  responseData: T
): { data: T; sucess: boolean; time: Date } => {
  return {
    data: responseData,
    sucess: true,
    time: new Date(),
  };
};

/**
 * Method to generate error response
 * @param responseData response to be handle
 * @returns
 */
export const sendErrorResponse = <T>(
  responseData: T
): { error: T; sucess: boolean; time: Date } => {
  return {
    error: responseData,
    sucess: false,
    time: new Date(),
  };
};

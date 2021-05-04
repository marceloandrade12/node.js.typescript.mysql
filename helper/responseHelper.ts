/**
 * Method to generate sucess response
 * @param responseData response to be handle
 * @returns
 */
export const sendSuccessResponse = (responseData: any): Record<string, any> => {
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
export const sendErrorResponse = (
  responseData: Record<string, any>
): Record<string, any> => {
  return {
    error: responseData,
    sucess: false,
    time: new Date(),
  };
};

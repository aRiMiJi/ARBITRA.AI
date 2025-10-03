
/**
 * Parses an error from the AI API and returns a user-friendly message.
 * @param {any} error The error object caught from the API call.
 * @returns {string} A user-friendly error message.
 */
export const getApiErrorMessage = (error: any): string => {
  console.error("AI API Error:", error);

  if (!error) {
    return "An unknown error occurred.";
  }

  let message = "An unexpected error occurred while communicating with the AI. Please try again.";
  let rawMessage = error.message || '';

  // Handle cases where error.message might be a JSON string
  try {
    const parsed = JSON.parse(rawMessage);
    if (parsed.error && parsed.error.message) {
      rawMessage = parsed.error.message;
    }
  } catch (e) {
    // It's not a JSON string, proceed with rawMessage
  }

  if (typeof rawMessage !== 'string') {
    rawMessage = 'Failed to get detailed error message.';
  }

  const lowerCaseMessage = rawMessage.toLowerCase();

  if (lowerCaseMessage.includes('api key not valid') || lowerCaseMessage.includes('permission denied')) {
    message = "Authentication Failed: Your API key appears to be invalid or missing permissions.";
  } else if (lowerCaseMessage.includes('rate limit exceeded') || lowerCaseMessage.includes('resource has been exhausted')) {
    message = "Rate Limit Exceeded: You've made too many requests. Please wait a moment before trying again.";
  } else if (lowerCaseMessage.includes('rpc failed') || lowerCaseMessage.includes('xhr error') || lowerCaseMessage.includes('network')) {
    message = "Network Error: Unable to reach the AI service. Please check your internet connection.";
  } else if (lowerCaseMessage.includes('model') && lowerCaseMessage.includes('not found')) {
    message = "Model Not Found: The specified AI model is unavailable or does not exist.";
  } else if ((error.code === 500 || lowerCaseMessage.includes('internal error')) && !lowerCaseMessage.includes('network')) {
    message = "Server Error: The AI service is currently experiencing issues. Please try again later.";
  } else if (error.code === 503) {
    message = "Service Unavailable: The AI service is temporarily down or overloaded. Please try again later.";
  } else if (error.code === 400 || lowerCaseMessage.includes('bad request')) {
    message = "Bad Request: The input prompt may be malformed or invalid. Please check your input.";
  }

  return message;
};
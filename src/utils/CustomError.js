export default class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the parent constructor with the message
    this.statusCode = statusCode; // Custom property to hold the HTTP status code

    /* Captures the stack trace
     * The first argument is the target object (the instance of CustomError)
     * The second argument is the constructor function to exclude from the stack trace (CustomError itself)
     * This means that when the stack trace is generated, it will not include the frames for the CustomError constructor,
     * making it cleaner and more relevant to where the error was actually thrown.
     */
    Error.captureStackTrace(this, CustomError);
  }
}

import { HttpStatus } from "./http-status";

/**
 * HttpRequestHandler class - handles requests and provides standard error handling
 */
export class HttpRequestHandler {
  constructor(protected request, protected response) {}

  get params() {
    return this.request.params;
  }

  get body() {
    return this.request.body;
  }

  /**
   * determines if request failed
   * @param err error object
   */
  public isError = (err) => !!err;

  /**
   * handles response when function isError returns true
   * @param err error object
   */
  public onError(err) {
    this.response.status(HttpStatus.internalServerError).json(err);
  }

  /**
   * sends request response
   * @param err error object
   * @param next event handler - what to do when isError function evaluates to false
   */
  public handle(err, next: (req, resp) => void) {
    if (this.isError(err)) {
      this.onError(err);
      return;
    }

    next(this.request, this.response);
  }
}

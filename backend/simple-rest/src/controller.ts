import * as ds from "./data";
import { HttpStatus, HttpRequestHandler } from "./http";

/**
 * Controller class
 */
export class Controller {
  constructor(private source: ds.DataSource) {}

  /**
   * Handles get request, returns list of entities
   * GET /collection
   * @param req request object
   * @param resp response object
   */
  public get(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    this.source.find((err, result) => handler.handle(err, (req, resp) => resp.json(result)), collection);
  }

  /**
   * Handles get request, returns entity by id
   * GET /collection/{id}
   * @param req request object
   * @param resp response object
   */
  public single(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    const query = { _id: handler.params.id };
    this.source.single(
      (err, result) => {
        const next = (req, resp) => {
          if (!result) {
            resp.sendStatus(HttpStatus.notFound);
            return;
          }

          resp.json(result);
        };

        handler.handle(err, next);
      },
      collection,
      query
    );
  }

  /**
   * Handles head request, returns http status OK (200) when entity exists in data source
   * otherwise http status not found (404)
   * HEAD /collection/{id}
   * @param req request object
   * @param resp response object
   */
  public head(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    const query = { _id: handler.params.id };
    this.source.exists(
      (err, result) =>
        handler.handle(err, (req, resp) => resp.sendStatus(result ? HttpStatus.ok : HttpStatus.notFound)),
      collection,
      query
    );
  }

  /**
   * Handles delete request, returns http status no content (204), even if entity was not found
   * DELETE /collection/{id}
   * @param req request object
   * @param resp response object
   */
  public delete(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    const query = { _id: handler.params.id };
    this.source.delete(
      (err, result) => handler.handle(err, (req, resp) => resp.sendStatus(HttpStatus.noContent)),
      collection,
      query
    );
  }

  /**
   * Handles post request, saves body in data source, returns http status created (201),
   * adds location header with url of the resource to the response
   * POST /collection
   * @param req request object
   * @param resp response object
   */
  public post(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    const doc = handler.body;
    this.source.insert(
      (err, result) => {
        const next = (req, resp) => {
          resp.append("Location", `${req.originalUrl}/${result._id}`);
          resp.sendStatus(HttpStatus.created);
        };
        handler.handle(err, next);
      },
      collection,
      doc
    );
  }

  /**
   * Handles put request, updates entity in data source, returns http status ok (200),
   * POST /collection/{id}
   * @param req request object
   * @param resp response object
   */
  public put(handler: HttpRequestHandler) {
    const collection = handler.params.collection;
    let update = { ...handler.body };
    delete update._id; // we do not want to update ids

    const parameters: ds.UpdateOptions = {
      query: { _id: handler.params.id },
      new: false,
      update: { $set: update },
    };

    this.source.update(
      (err, result) => handler.handle(err, (req, resp) => resp.sendStatus(HttpStatus.ok)),
      collection,
      parameters
    );
  }
}

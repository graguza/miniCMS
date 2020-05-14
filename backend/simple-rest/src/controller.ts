import * as ds from "./data";

export class Controller {
  constructor(private source: ds.DataSource) {}

  public get(req, resp) {
    const collection = req.params.collection;
    const callback = this.getCallback(req, resp);
    this.source.find(callback, collection);
  }

  public single(req, resp) {
    const collection = req.params.collection;
    const query = { _id: req.params.id };
    const callback = this.getCallback(req, resp);
    this.source.single(callback, collection, query);
  }

  public head(req, resp) {}

  public delete(req, resp) {}

  public post(req, resp) {
    const collection = req.params.collection;
    const doc = req.body;
    const callback = this.getCallback(req, resp);
    this.source.insert(callback, collection, doc);
  }

  public put(req, resp) {}

  private getCallback(req, resp) {
    return (err, result) => {
      if (!!err) {
        resp.send(err);
        return;
      }

      resp.json(result);
    };
  }
}

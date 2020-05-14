import mongojs from "mongojs";
import * as ds from "./data-source.types";
import { DataSource } from "./data-source.interface";

export class MongoDbSource implements DataSource {
  private db;
  constructor(connectionString: string) {
    this.db = mongojs(connectionString);
  }

  public single(
    callback: ds.Callback<any>,
    collection: string,
    query?: ds.AnyObject & { _id?: any }
  ) {
    const dbCollection = this.db.collection(collection);
    const q = this.getQuery(query);
    dbCollection.findOne(q, callback);
  }

  public delete(
    callback: ds.Callback<any>,
    collection: string,
    query?: ds.AnyObject
  ) {
    const dbCollection = this.db.collection(collection);
    throw new Error("Method not implemented.");
  }

  public update(
    callback: ds.Callback<any>,
    collection: string,
    query?: ds.AnyObject
  ) {
    const dbCollection = this.db.collection(collection);
    throw new Error("Method not implemented.");
  }

  public insert(
    callback: ds.Callback<any>,
    collection: string,
    document: ds.AnyObject
  ) {
    const dbCollection = this.db.collection(collection);
    this.db.mycollection.save(document, callback);
  }

  public find(
    callback: ds.Callback<any[]>,
    collection: string,
    query: ds.AnyObject = {},
    options: ds.QueryOptions = { take: null, skip: null },
    sort?: ds.AnyObject
  ): any {
    const dbCollection = this.db.collection(collection);
    let result = dbCollection.find(query);
    if (!!sort && Object.keys(sort).length > 0) {
      result = result.sort(sort);
    }
    if (!options) {
      this.toArray(result, callback);
      return;
    }

    if (options.take) {
      result = result.limit(options.take);
    }

    if (!options.skip) {
      this.toArray(result, callback);
      return;
    }

    result = result.skip(options.skip);
    this.toArray(result, callback);
  }

  private toArray(result: any, callback: ds.Callback<any>) {
    result.toArray(function (err, docs) {
      callback(err, docs);
    });
  }

  private getQuery(query: ds.AnyObject & { _id?: any }) {
    if (!!query && !!query._id) {
      return {
        ...query,
        _id: mongojs.ObjectId(query._id),
      };
    }

    return query;
  }
}

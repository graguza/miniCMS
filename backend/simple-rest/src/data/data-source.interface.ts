import { Callback, AnyObject, QueryOptions } from "./data-source.types";

export interface DataSource {
  find(
    callback: Callback<any[]>,
    collection: string,
    query?: AnyObject,
    options?: QueryOptions,
    sort?: AnyObject
  ): any;

  single(
    callback: Callback<any>,
    collection: string,
    query?: AnyObject & { _id?: any }
  ): any;
  delete(callback: Callback<any>, collection: string, query?: AnyObject): any;
  update(callback: Callback<any>, collection: string, query?: AnyObject): any;
  insert(callback: Callback<any>, collection: string, document: AnyObject): any;
}

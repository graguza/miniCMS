import { Callback, AnyObject, QueryOptions, DeleteResponse, UpdateOptions } from "./data-source.types";

export interface DataSource {
  find(callback: Callback<any[]>, collection: string, query?: AnyObject, options?: QueryOptions, sort?: AnyObject): any;
  single(callback: Callback<AnyObject>, collection: string, query?: AnyObject & { _id?: any }): any;
  delete(callback: Callback<DeleteResponse>, collection: string, query?: AnyObject): any;
  update(callback: Callback<any>, collection: string, parameters: UpdateOptions): any;
  insert(callback: Callback<any>, collection: string, document: AnyObject): any;
  exists(callback: Callback<boolean>, collection: string, query?: AnyObject): any;
}

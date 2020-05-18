type QueryOptions = { take?: number; skip?: number };
type AnyObject = {
  [key: string]: any;
};
type Callback<T> = (err: any, result: T) => void;
type DeleteResponse = { n: number; ok: number; deletedCount: number };
type UpdateOptions = {
  query: AnyObject;
  update: { $set?: AnyObject };
  new: boolean;
};
export { QueryOptions, AnyObject, Callback, DeleteResponse, UpdateOptions };

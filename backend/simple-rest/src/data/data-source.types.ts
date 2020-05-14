type QueryOptions = { take?: number; skip?: number };
type AnyObject = {
  [key: string]: any;
};
type Callback<T> = (err: any, result: T) => void;


export { QueryOptions, AnyObject, Callback };

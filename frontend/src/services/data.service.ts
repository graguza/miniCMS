import { Observable } from "rxjs";
import { UrlBuilderService } from "./url-builder.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) {}

  public get<T>(templateUrl: string, params?: any): Observable<T> {
    const urlParameters = params || {};
    const url = this.urlBuilder.format(templateUrl, urlParameters);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http.get<T>(url, httpOptions);
  }

  public save<T>(urlTemplate: string, params?: any, urlParams?: any, putAction?: boolean): Observable<T> {
    const urlParameters = urlParams || {};
    const url = this.urlBuilder.format(urlTemplate, urlParameters);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    if (putAction) {
      return this.http.put<T>(url, params, httpOptions);
    }

    return this.http.post<T>(url, params, httpOptions);
  }

  public post(urlTemplate: string, params?: any, urlParams?: any){
    const urlParameters = urlParams || {};
    const url = this.urlBuilder.format(urlTemplate, urlParameters);

    const httpOptions = {
      observe:"response",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http.post(url, params, httpOptions as any);
  }
}

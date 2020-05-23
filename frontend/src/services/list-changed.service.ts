import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ListChangedService {
  private subject: ReplaySubject<any> = new ReplaySubject();
  private observable$ = this.subject.asObservable();
  public notify() {
    this.subject.next();
  }
  public subscribe(fn) {
    this.observable$.subscribe(fn);
  }
}

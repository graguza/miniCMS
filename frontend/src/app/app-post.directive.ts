import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-post]',
})
export class AppPostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

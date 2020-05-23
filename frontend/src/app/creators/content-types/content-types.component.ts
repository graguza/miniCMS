import { Component, OnInit, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-content-types",
  templateUrl: "./content-types.component.html",
  styleUrls: ["./content-types.component.scss"],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ContentTypesComponent), multi: true }],
})
export class ContentTypesComponent implements ControlValueAccessor, OnInit {
  private _value: any[];

  get value() {
    return this._value;
  }

  private onTouchedCallback: () => void = () => undefined;

  private onChangeCallback: (_: any) => void = () => undefined;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {}

  public writeValue(obj: any) {
    if (obj !== this.value) {
      this._value = obj;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public setDisabledState?(isDisabled: boolean) {}

  public onBlur() {
    this.onTouchedCallback();
  }

  public onChange(next, previous) {
    const index = this.value.indexOf(previous);
    if (index < 0) {
      this._value.push(next);
      this.onChangeCallback(this._value);
      return;
    }

    this._value[index] = next;
    // this._value = [...this._value];
    this.onChangeCallback(this._value);
  }
}

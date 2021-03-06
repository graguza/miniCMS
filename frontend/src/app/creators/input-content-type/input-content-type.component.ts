import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-input-content-type",
  templateUrl: "./input-content-type.component.html",
  styleUrls: ["./input-content-type.component.scss"],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputContentTypeComponent), multi: true }],
})
export class InputContentTypeComponent implements ControlValueAccessor, OnInit {
  private _value;
  public inputContentTypeForm = this.fb.group({
    title: ["", { updateOn: "blur" }],
    description: ["", { updateOn: "blur" }],
    required: [false],
    visible: [true],
    type: ["input"]
  });

  get value() {
    return this._value;
  }

  private onTouchedCallback: () => void = () => undefined;

  private onChangeCallback: (_: any) => void = () => undefined;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.inputContentTypeForm.valueChanges.subscribe((o) => {
      this._value = o;
      this.onChangeCallback(this.value);
    });
  }

  public writeValue(obj: any) {
    if (obj !== this.value) {
      this._value = obj;
    }

    if (!!this._value) {
      this.inputContentTypeForm.setValue(this._value, { emitEvent: false });
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
}

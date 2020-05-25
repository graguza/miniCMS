import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-picture-content-type',
  templateUrl: './picture-content-type.component.html',
  styleUrls: ['./picture-content-type.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PictureContentTypeComponent), multi: true }],
})
export class PictureContentTypeComponent implements ControlValueAccessor, OnInit {
  private _value;
  public pictureContentTypeForm = this.fb.group({
    title: ["", { updateOn: "blur" }],
    description: ["", { updateOn: "blur" }],
    required: [false],
    visible: [true],
    type: ["picture"]
  });

  get value() {
    return this._value;
  }

  private onTouchedCallback: () => void = () => undefined;

  private onChangeCallback: (_: any) => void = () => undefined;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.pictureContentTypeForm.valueChanges.subscribe((o) => {
      this._value = o;
      this.onChangeCallback(this.value);
    });
  }

  public writeValue(obj: any) {
    if (obj !== this.value) {
      this._value = obj;
    }

    if (!!this._value) {
      this.pictureContentTypeForm.setValue(this._value, { emitEvent: false });
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

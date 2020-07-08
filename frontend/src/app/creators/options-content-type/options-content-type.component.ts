import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-options-content-type",
  templateUrl: "./options-content-type.component.html",
  styleUrls: ["./options-content-type.component.scss"],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OptionsContentTypeComponent), multi: true }],
})
export class OptionsContentTypeComponent implements ControlValueAccessor, OnInit {
  public dataSources = [
    { name: "Lista", value: "list" },
    { name: "Kolekcja", value: "collection" },
  ];
  private defaults = {
    title: "",
    description: "",
    dataSource: "list",
    collection: "",
    field: "",
    options: [],
    required: false,
    visible: true,
    type: "select",
  };

  private _value;
  public optionsContentTypeForm = this.fb.group({
    title: ["", { updateOn: "blur" }],
    description: ["", { updateOn: "blur" }],
    dataSource: ["list"],
    collection: ["", { updateOn: "blur" }],
    field: ["", { updateOn: "blur" }],
    options: ["", { updateOn: "blur" }],
    required: [false],
    visible: [true],
    isMultiple: [false],
    type: ["select"],
  });

  get value() {
    return this._value;
  }

  private onTouchedCallback: () => void = () => undefined;

  private onChangeCallback: (_: any) => void = () => undefined;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.optionsContentTypeForm.valueChanges.subscribe((o) => {
      this._value = { ...o, options: o.options.split(",") };
      this.onChangeCallback(this.value);
    });
  }

  public writeValue(obj: any) {
    if (obj !== this.value) {
      this._value = obj;
    }

    if (!!this._value) {
      this._value = { ...obj, options: obj.options ? obj.options.join(",") : [] };
      this.optionsContentTypeForm.setValue(this._value, { emitEvent: false });
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

import {
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  Directive,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const APP_FILE_INPUT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AppFileInputDirective),
  multi: true,
};

@Directive({
  selector: '[appFileInput][type=file]',
  providers: [APP_FILE_INPUT_ACCESSOR],
  host: {
    '(focus)': 'focused = true',
    '(blur)': 'focused = false',
  },
})
export class AppFileInputDirective implements ControlValueAccessor {
  @Input() name: string;
  public _onChange = (_: any) => {};
  public _onTouched = () => {};
  private file: File | null = null;

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    this._onChange(file);
    this._onTouched();
    this.file = file;
  }

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {}

  writeValue(value: null) {
    // clear file input
    this._elementRef.nativeElement.value = '';
    this.file = null;
  }

  set focused(isFocused: boolean) {
    if (!isFocused) {
      this._onTouched();
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'disabled',
      isDisabled,
    );
  }
}

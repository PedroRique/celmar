import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[appPhoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskDirective),
      multi: true,
    },
  ],
})
export class PhoneMaskDirective implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: string | null): void {
    const digits = (value || '').replace(/\D/g, '').slice(0, 11);
    this.el.nativeElement.value = this.formatPhone(digits);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    const formatted = this.formatPhone(digits);

    input.value = formatted;
    this.onChange(formatted);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  private formatPhone(digits: string): string {
    if (!digits.length) {
      return '';
    }

    if (digits.length <= 2) {
      return `(${digits}`;
    }

    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
}

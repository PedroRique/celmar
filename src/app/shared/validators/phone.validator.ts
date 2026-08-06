import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digits = (control.value || '').replace(/\D/g, '');

    if (digits.length !== 11) {
      return { phone: true };
    }

    return null;
  };
}

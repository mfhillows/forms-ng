import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidators {
  static restrictedEmails(control: AbstractControl): { [key: string]: any } {
    if (['q@mail.ru', 'tr@mail.ru'].includes(control.value)) {
      return { restrictedEmail: true };
    }
    return null as any;
  }

  static uniqEmail(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'w@mail.ru') {
          resolve({ uniqEmail: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}

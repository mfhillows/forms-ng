import { MyValidators } from './my-validators';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [Validators.email, Validators.required, MyValidators.restrictedEmails],
        [MyValidators.uniqEmail]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      addres: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', Validators.required),
      }),
      skills: new FormArray([]),
    });
  }

  submit() {
    console.log('Form:', this.form);
  }

  setCapital() {
    interface cityMaps {
      [key: string]: string;
    }
    const cityMap: cityMaps = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск',
    };
    const cityKey = this.form.get('addres')?.get('country')?.value;
    const city = cityMap[cityKey];
    this.form.patchValue({ addres: { city: city } });
  }

  addSkills() {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }
}

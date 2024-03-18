import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { minDateValidator } from '../validators/formValidator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent implements OnInit{

//Declare all controls with validation rules
// orderForm = this.fb.group({
//   title: ['', [Validators.required, Validators.minLength(5)]],
//   quantity: [0, [Validators.required, Validators.max(5)]],
//   date: ['', Validators.required],
//   contact: ['', [Validators.required, Validators.email]],
//   payments: this.fb.array([]) //FormArray control
// })

orderForm = new FormGroup({
  title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
  quantity: new FormControl<number>(0, [Validators.required, Validators.max(5)]),
  date: new FormControl<string>('', [Validators.required]),
  contact: new FormControl<string>('', [Validators.required, Validators.email]),
  payments: new FormArray([])
});

ngOnInit(): void {
  //get Observable from FormGroup
  this.orderForm.valueChanges
  //Listen to value change
  .subscribe(value =>  {
    console.log('orderForm value changes: ', value);
    
  })

}

constructor(private fb: FormBuilder){}

  onSubmit(): void {
   //get form value as JSON object
   console.log('oderForm submitted :', this.orderForm.value);
  }

  addPayements() {
    //Création de formGroup avec deux formControl
    const paymentForm = new FormGroup({
      date: new FormControl<Date>(new Date(),[ Validators.required, minDateValidator(new Date())]),
      amount: new FormControl<string>('', Validators.required) 
    })

    //parse l'abstract control de formArray
    const paymentsArray = this.orderForm.get('payments') as FormArray;
    //ajoute un nouveau form group pour le control 'payments'
    paymentsArray.push(paymentForm)
  }

  get payments(): FormArray {
    return this.orderForm.get('payments') as FormArray
  }

}

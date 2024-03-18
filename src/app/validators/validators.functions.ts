import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function oneOrTwoControlFilledValidator(controlName1: string, controlName2: string ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value1 = control.get(controlName1)?.value;
        const value2 = control.get(controlName2)?.value;

        if(value1 || value2) {
            return null;
        } else {
            return {'missing': {expected: value1 | value2}}
        }
    }
}


export function rangeDateValidator(yearMin: number, yearMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = control.value;

        if(controlValue >= yearMin && controlValue <= yearMax){
            return null;
        } else {
            return {'minMax': {value:control.value, expected:controlValue >= yearMin && controlValue <= yearMax}}
        }
    }
}
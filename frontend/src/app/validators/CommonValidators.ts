import { BasicService } from './../services/basic.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()


export class CommonValidators {
  employees: any[];
  constructor (private basicservice: BasicService) {}

   employeeValidator(control: any): any {
        this.basicservice.getAllEmployees().subscribe(data => {
          this.employees = data.rows;
        if (this.employees.filter(function(e) {return e.NAME === control; }).length <= 0 ) {

          return false;
        } else {
          return null;
        }
        });
    }

    otherValidator(control: AbstractControl): ValidationErrors | null {
        return null;
    }
}

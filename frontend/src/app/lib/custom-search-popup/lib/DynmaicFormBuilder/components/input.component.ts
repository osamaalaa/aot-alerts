import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ViewEncapsulation } from '@angular/core';
import { FieldConfig } from '../interface/FieldConfig';
@Component({
    selector: "app-input.col-md-6",
    template: `
    <nz-form-item [formGroup]="group">
        <!--<nz-form-label nzFor="title">{{field.label.en_name}} </nz-form-label>-->
        <nz-form-control>
            <input nz-input [name]="field.name" [type]="field.inputType" [id]="field.name" [placeholder]="field.label.en_name"
                [formControlName]="field.name">
            <div *ngFor="let validation of field.validations;">
                <nz-form-explain class="red-color" *ngIf="group.get(field.name).hasError(validation.name)">
                    {{validation.message}}
                </nz-form-explain>
            </div>
        </nz-form-control>
    </nz-form-item>
`,
    styles: [],
    encapsulation:ViewEncapsulation.None
})
export class InputComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
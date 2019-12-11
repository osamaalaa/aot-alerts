import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../interface/FieldConfig';
@Component({
    selector: "app-button.row",
    template: `
<div class="col-lg-6" [formGroup]="group">
<button nz-button nzType="primary" (click)="fakeLoading()" [nzLoading]="isLoading"><i nz-icon nzType="search"></i>{{field.label.en_name}}</button>
</div>
`,
    styles: []
})
export class ButtonComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    isLoading:boolean = false
    constructor() { }
    ngOnInit() { }
    fakeLoading(){
        this.isLoading = true;
        setTimeout(()=>{
            this.isLoading = false;
        },500)
    }
}
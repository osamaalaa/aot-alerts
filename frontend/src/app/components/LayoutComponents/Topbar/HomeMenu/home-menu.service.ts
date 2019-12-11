import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HomeMenuService{
    constructor(){

    }

    public refreshNotification$ = new Subject();
}
import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { SearchModalComponent } from './search-modal/search-modal.component';


@Directive({ selector: '[custom-search-popup]' })
export class CustomSearchPopup {

  /**
   * * When user selects the rows and submits, the selected values are emmited
   * * to output
   */
  @Output() onSubmit = new EventEmitter();

  /**
   * * entityType which defines which strategy to use for both form and table
   * @example : "item";
   * 
   * "item" entity will make "ItemEntity" class which has all the config for table and search form;
   * 
   */
  @Input() entityType:string;



  /**
   * * When directive is clicked the Search Modal is opened. 
   */
  @HostListener('click', ['$event']) onClick($event) {
    this.createComponentModal();
  }
  
  constructor(
    private modalService: NzModalService
  ) {}


  /**
   * Creates Search Modal component.
   * *Entity Type is passed to searchModal to create Entity based on the entityType;
   * *On modal close . If submit button is clicked then data is send as 
   * * output 
   */
  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: SearchModalComponent,
      nzComponentParams: {
        entityType:this.entityType
      },
      nzFooter: [
        {
          label: 'Submit',
          onClick: componentInstance => {
            modal.close()
            this.onSubmit.emit(componentInstance.searchModalService.selectedItems)
          }
        }
      ]
    });

    /** !NOT USED */
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

     /** !NOT USED */
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }


}
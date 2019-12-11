import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SearchModalService } from './search-modal.service';
import { DynamicFormComponent } from '../lib/DynmaicFormBuilder/dynamic-form.component';
import { IEntity } from '../entities/interface/Entity';
import { EntityFactory } from '../entities/entityFactory';
@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  providers: [SearchModalService]
})
export class SearchModalComponent implements OnInit {

  /**
   * entity is the strategy that defines which form and table to use.
   * e.g if entityType is "item", then entity will be "ItemEntity" which has all the 
   * configuration for form and table
   */
  entity:IEntity;

  @Input() entityType: string;
  
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  
  constructor(
    private modal: NzModalRef,
    public searchModalService: SearchModalService
  ) {}

   ngOnInit() {
     this.getEnitityBasedOnType();
     this.changeModalTitle();
   }


  /**
   * * This function is called when user selects row in the table. It is saved in search Modal service
   * @param e : Array of selected row data
   */
  onSelectedRowsData(e){
    this.searchModalService.selectedItems = e
  }

  /**
   * * Creates entity based on the entityType(passed by @Input)
   */
  private getEnitityBasedOnType(){
    this.entity = EntityFactory.createEntity(this.entityType);
  }


  /**
   * * Based on the entity, The title of the modal is changed
   */
  changeModalTitle(){
    this.modal.getInstance().nzTitle = this.entity.title.en_name;
  }

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

  /**
   * * This function is called when user submits the form.
   * * The submitted data is also called filter. This filter is then pushed to Subject/Observable
   * * Table listens to this Subject/Observable and filters the list based on filter
   * @param e : FormData from the form
   */
  onSubmit(e) {
    this.searchModalService.filterChanged$.next(e);
  }
}

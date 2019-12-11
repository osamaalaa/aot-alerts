/**
 * @author : Ahmed hussien
 * @date : 22/09/2019
 *
 * * Model service for item Alias.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class LogsModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInEVENT_ID = (item: any) =>
        item.EVENT_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInEVENT_NAME = (item: any) =>
        item.EVENT_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInMESSAGE = (item: any) =>
        item.MESSAGE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      this.displayData = this.savedData.filter(
        item => isTextInEVENT_ID(item) || isTextInEVENT_NAME(item) ||isTextInMESSAGE(item) ,
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}

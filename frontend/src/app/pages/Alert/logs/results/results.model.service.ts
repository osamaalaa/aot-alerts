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
export class ResultsModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInEXECUTION_ID = (item: any) =>
        item.EXECUTION_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInEXECUTION_TYPE = (item: any) =>
        item.EXECUTION_TYPE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInEXECUTION_IDENTIFIER_EN = (item: any) =>
        item.EXECUTION_IDENTIFIER_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInRESULT_MESSAGE = (item: any) =>
          item.RESULT_MESSAGE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;    
      this.displayData = this.savedData.filter(
        item => isTextInEXECUTION_ID(item) || isTextInEXECUTION_TYPE(item) ||isTextInEXECUTION_IDENTIFIER_EN(item) || isTextInRESULT_MESSAGE(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}

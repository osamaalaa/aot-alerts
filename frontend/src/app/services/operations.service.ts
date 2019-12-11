import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from './constants.service';

@Injectable()
export class OperationsService {
  constructor(private http: HttpClient) { }
  getallitems(): Observable<any> {
    return this.http.get(`/items/getallitems/`)
  }
  getAllStores(): Observable<any> {
    return this.http.get(`/stores/selectAllstores`);
  }

  getOneInvOpenBalance(INV_OPEN_BALANCE_ID: string | number = null): Observable<any> {
    return this.http.get(`/OpenBalance/getOneOpenBalanceByID/${INV_OPEN_BALANCE_ID}`)
  }

  getOneTransfer(TRANSFER_ID: string | number = null): Observable<any> {
    return this.http.get(`/transfer/getOneTransfer/${TRANSFER_ID}`)
  }

  getOneRcvInspection(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvInspection/getOneRcvInspection/${DOCUMENT_ID}`)
  }
  getOneRcvTemp(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvTempo/getRcvTempobyID/${DOCUMENT_ID}`)
  }

  /**Get One Rcv Document */
  getOneRcvDocument(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDocument/getOneRcvDocument/${DOCUMENT_ID}`)
  }

  getAllRcvDocumentITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvDocItems/getAllRcvDocumentITems/${queryParam}`)
  }
  getLookUps(lookupid: any): Observable<any> {
    return this.http.get(`/items/getLookUps/` + lookupid)
  }

  getRcvDocumentItemsDetailsAgainstRcvDocumentsId(RCV_DOCUMENT_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_DOCUMENT_ITEMS_ID ? `?RCV_DOCUMENT_ITEMS_ID=${RCV_DOCUMENT_ITEMS_ID}` : ''
    return this.http.get(`/rcvDoctItemsD/getAllrcvDoctItemsD${queryParam}`)
  }
  getRcvInspectionItemsDetailsAgainstRcvDocumentsId(RCV_INSPECTION_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_INSPECTION_ITEMS_ID ? `?RCV_INSPECTION_ITEMS_ID=${RCV_INSPECTION_ITEMS_ID}` : ''
    return this.http.get(`/rcvInspectionItemsD/getAllrcvInspectionItemsD${queryParam}`)
  }

  /**Insert Rcv Document Items*/
  insertNewRcvDocumentITems(body: any): Observable<any> {
    return this.http.post(`/rcvDocItems/insertNewRcvDocumentITems`, body);
  }


  insertrcvDoctItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvDoctItemsD/insertrcvDoctItemsD`, body);
  }

  /**Update Rcv Document Items*/
  updateRcvDocumentItems(RCV_DOCUMENT_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvDocItems/updateRcvDocumentItems/${RCV_DOCUMENT_ITEMS_ID}`, formData)
  }

  /**Update Rcv Document Items Details*/
  updatercvDoctItemsD(RCV_DOCUMENT_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvDoctItemsD/updatercvDoctItemsD/${RCV_DOCUMENT_ITEMS_D_ID}`, formData)
  }

  deleteRcvDocumentItems(RCV_DOCUMENT_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvDocItems/deleteRcvDocumentItems', {
      DELETED_BY: 1,
      RCV_DOCUMENT_ITEMS_ID

    })
  }
  deleteInspectionItems(RCV_INSPECTION_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvInspectionItems/deleteRcvInspectionItems', {
      DELETED_BY: 1,
      RCV_INSPECTION_ITEMS_ID

    })
  }
  deleteTempItems(RCV_TEMP_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvTempo/rcvTmpoItems/deleteTmpItem', {
      DELETED_BY: 1,
      RCV_TEMP_ITEMS_ID

    })
  }



  /**Delete Rcv Document Items Details*/

  deleteRcvDocumentItemsDetails(RCV_DOCUMENT_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvDoctItemsD/deleteRcvDocumentItemsDetails', {
      DELETED_BY: 1,
      RCV_DOCUMENT_ITEMS_D_ID

    })
  }

  /**Delete Rcv Document Items Details*/

  deleteInspectionItemsDetails(RCV_INSPECTION_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvInspectionItemsD/deleteRcvInspectionItemsD', {
      DELETED_BY: 1,
      RCV_INSPECTION_ITEMS_D_ID

    })
  }

  deleteTempItemsDetails(RCV_TEMP_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvTempoItemsD/deleteRcvTempoItemsD', {
      DELETED_BY: 1,
      RCV_TEMP_ITEMS_D_ID

    })
  }

  /**Get All Rcv Document Items Details*/
  getAllrcvDoctItemsD(): Observable<any> {
    return this.http.get(`/rcvDoctItemsD/getAllrcvDoctItemsD`)
  }


  /**Insert Rcv Inspection Items*/
  insertNewRcvInspectionITems(body: any): Observable<any> {
    return this.http.post(`/rcvInspectionItems/insertrcvInspectionItems`, body);
  }
  /**Insert Rcv Inspection Items*/
  insertNewRcvTempITems(body: any): Observable<any> {
    return this.http.post(`/rcvTempo/rcvTmpoItems/insertTmpItem`, body);
  }

  /**Insert Rcv Document Items Details*/

  insertrcvInspectiontItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvInspectionItemsD/insertrcvInspectionItemsD`, body);
  }
  insertrcvTempItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvTempoItemsD/insertrcvTmpoItemsD`, body);
  }

  /**Add Rcv Document */
  insertRcvDocument(formData: any): Observable<any> {
    return this.http.post(`/rcvDocument/insertRcvDocument`, formData)
  }
  /**Add Rcv Document */
  insertRcvInspection(formData: any): Observable<any> {
    return this.http.post(`/rcvInspection/insertNewRcvInspection`, formData)
  }
  /**Add Rcv Document */
  insertRcvTemp(formData: any): Observable<any> {
    return this.http.post(`/rcvTempo/insertRcvTempo`, formData)
  }

  /**Get Rcv DocumentById */
  getRcvTemporaryAgainstStoreId(STORES_ID: string | number = null, DOCUMENT_STATUS): Observable<any> {

    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    queryParam = queryParam + `&DOCUMENT_STATUS=${DOCUMENT_STATUS}`
    return this.http.get(`/rcvTempo/getRcvTempo${queryParam}`)
  }



  /**Update Rcv Document */
  updateRcvDocument(RCV_DOCUMENT_ID, formData): Observable<any> {
    return this.http.post(`/rcvDocument/updateRcvDocument/${RCV_DOCUMENT_ID}`, formData)
  }

  /**Update Rcv Document */
  updateRcvInspection(DOCUMENT_ID, formData): Observable<any> {
    return this.http.post(`/rcvInspection/updateRcvInspectionById/${DOCUMENT_ID}`, formData)
  }


  /**Update Rcv Document Items*/
  updateRcvInspectionItems(RCV_INSPECTION_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvInspectionItems/updatercvInspectionItems/${RCV_INSPECTION_ITEMS_ID}`, formData)
  }
  /**Update Rcv Document Items*/
  updateRcvTemporaryItems(RCV_TEMP_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvTempo/updateRcvTempoById/${RCV_TEMP_ITEMS_ID}`, formData)
  }



  /**Update Rcv Document Items Details*/
  updateRcvInspectionItemsD(RCV_INSPECTION_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvInspectionItemsD/updatercvInspectionItemsD/${RCV_INSPECTION_ITEMS_D_ID}`, formData)
  }
  /**Update Rcv Document Items Details*/
  updatercvTempItemsD(RCV_TEMP_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvTempoItemsD/updatercvTmpoItemsD/${RCV_TEMP_ITEMS_D_ID}`, formData)
  }


  /**Delete Rcv Document */
  deleteRcvDocument(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvDocument/deleteRcvDocument', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }
  /**Delete Rcv Document */
  deleteRcvInspection(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvInspection/deleteRcvInspection', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }
  /**Delete Rcv Document */
  deleteRcvTemporary(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvTempo/deleteRcvTempo', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }

  getallDocumentTypes(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes`)
  }

  getallInventoryPeriod(): Observable<any> {
    return this.http.get(`/InvPeriod/getAllInventoryPeriod`)
  }

  getSupplierall(): Observable<any> {
    return this.http.get('/suppliers/getSuppliers')
  }

  /**Getall Base Document Id's */
  getAllBaseDocumentId(): Observable<any> {
    return this.http.get(`/rcvTempo/getRcvTempo`)
  }

  /**Get Rcv DocumentById */
  getRcvDocumentAgainstStoreId(STORES_ID: string | number = null, DOCUMENT_STATUS): Observable<any> {

    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    queryParam = queryParam + `&DOCUMENT_STATUS=${DOCUMENT_STATUS}`
    return this.http.get(`/rcvDocument/getAllRcvDocument${queryParam}`)
  }


  /**Get Rcv DocumentById */
  getRcvInspectionAgainstStoreId(STORES_ID: string | number = null, DOCUMENT_STATUS): Observable<any> {

    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    queryParam = queryParam + `&DOCUMENT_STATUS=${DOCUMENT_STATUS}`
    return this.http.get(`/rcvInspection/getAllRcvInspection${queryParam}`)
  }
  getAllRcvInspectionITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvInspectionItems/getAllrcvInspectionItems/${queryParam}`)
  }

  getAllRcvTempITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvTempo/rcvTmpoItems/getTmpItems/${queryParam}`)
  }
  /** Update */
  updateInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItems/updatetransferItemsById/${INV_TRANSFER_ITEMS_ID}`, body)
  }

  getOneInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/transferItems/getOnetransferItems/${INV_TRANSFER_ITEMS_ID}`)
  }

  /**Rcv Document API'S */

  /**Get Rcv Documents */
  getRcvDocuments(): Observable<any> {
    return this.http.get(`/rcvDocument/getAllRcvDocument`)
  }


  /**Get One Rcv Document Items */
  getOneRcvItemsDocument(RCV_DOCUMENT_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDocItems/getOneRcvDocumentITems/${RCV_DOCUMENT_ITEMS_ID}`)
  }


  /**Get One Rcv Document Items Details */
  getOnercvDoctItemsD(RCV_DOCUMENT_ITEMS_D_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDoctItemsD/getOnercvDoctItemsD/${RCV_DOCUMENT_ITEMS_D_ID}`)
  }


  getRcvTempItemsDetailsAgainstRcvtempId(RCV_TEMP_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_TEMP_ITEMS_ID ? `?RCV_TEMP_ITEMS_ID=${RCV_TEMP_ITEMS_ID}` : ''
    return this.http.get(`/rcvTempoItemsD/getAllrcvTmpoItemsD${queryParam}`)
  }

  getInvBalanceItemDetailsAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = INV_OPEN_BALANCE_ITEMS_ID ? `?INV_OPEN_BALANCE_ITEMS_ID=${INV_OPEN_BALANCE_ITEMS_ID}` : ''
    return this.http.get(`/openBalanceItemsD/getAllOpenBalanceItemsD${queryParam}`)
  }

  deleteInvOpenBalanceItemDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.delete(`/openBalanceItemsD/deleteOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`);
  }

  getInvTransferItemDetailsAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = INV_OPEN_BALANCE_ITEMS_ID ? `${INV_OPEN_BALANCE_ITEMS_ID}` : ''
    return this.http.get(`/transferItemsD/getOnetransferItemsD/${INV_OPEN_BALANCE_ITEMS_ID}`)
  }
  addInvOpenBalanceItemsDetails(body: any): Observable<any> {
    return this.http.post(`/openBalanceItemsD/insertOpenBalanceItemsD`, body);
  }
  addInvTransferItemsDetails(body: any): Observable<any> {
    return this.http.post(`/transferItemsD/inserttransferItemsD`, body);
  }
  /** Update stores items group no  data */
  updateInvOpenBalanceItemsDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/openBalanceItemsD/updateOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`, body)
  }

  getOneInvOpenBalanceItemsDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number = null): Observable<any> {
    return this.http.get(`/openBalanceItemsD/getOneOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`)
  }
  getInvTransferItemsAgainstInvTransferId(INV_TRANSFER_ID: string | number = null): Observable<any> {
    let queryParam = INV_TRANSFER_ID ? `?INV_TRANSFER_ID=${INV_TRANSFER_ID}` : ''
    return this.http.get(`/transferItems/getAlltransferItems${queryParam}`)
  }
  addInvOpenBalance(body: any): Observable<any> {
    return this.http.post(`/OpenBalance/insertOpenBalance`, body);
  }
  addInvTransferItems(body: any): Observable<any> {
    return this.http.post(`/transferItems/inserttransferItems`, body);
  }
  addInvOpenBalanceItems(body: any): Observable<any> {
    console.log(body)
    return this.http.post(`/OpenBalanceItems/insertOpenBalanceItem`, body);
  }

  getOneInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/OpenBalanceItems/getOneOpenBalanceItemByID/${INV_OPEN_BALANCE_ITEMS_ID}`)
  }

  /** Update stores items group no  data */
  updateInvOpenBalance(INV_OPEN_BALANCE_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_OPEN_BALANCE_ID}`, body)
  }

  /** Update stores items group no  data */
  patchInvOpenBalanceWF_RequestID(INV_OPEN_BALANCE_ID: string | number, body: { WF_REQUEST_ID: string | number }): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_OPEN_BALANCE_ID}`, body)
  }
  /** Update stores items group no  data */
  updateInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/OpenBalanceItems/updateOpenBalanceItems/${INV_OPEN_BALANCE_ITEMS_ID}`, body)
  }


  deleteInvOpenBalance(INV_OPEN_BALANCE_ID: string | number): Observable<any> {
    alert("api not implemented")
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(``, { INV_OPEN_BALANCE_ID: INV_OPEN_BALANCE_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  deleteInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number): Observable<any> {
    return this.http.delete(`/OpenBalanceItems/deleteOpenBalanceItems/${INV_OPEN_BALANCE_ITEMS_ID}`);
  }
  getInvBalanceAgainstStoreId(STORES_ID: string | number = null, DOCUMENT_STATUS): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    queryParam = queryParam + `&DOCUMENT_STATUS=${DOCUMENT_STATUS}`
    return this.http.get(`/OpenBalance/getOpenbalance${queryParam}`)
  }
  getInvBalanceAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ID: string | number = null): Observable<any> {
    let queryParam = INV_OPEN_BALANCE_ID ? `?INV_OPEN_BALANCE_ID=${INV_OPEN_BALANCE_ID}` : ''
    return this.http.get(`/OpenBalanceItems/getOpenbalanceITems${queryParam}`)
  }
  getInvTransferAgainstInvTransferId(INV_OPEN_BALANCE_ID: string | number = null): Observable<any> {
    return this.http.get(`/TransferRItems/getOneTransferRItems/${INV_OPEN_BALANCE_ID}`)
  }

  getInvStoreList(): Observable<any> {
    return this.http.get(`/TransferStores/getAllTransferStores/`)
  }

  getAllTransferStores(): Observable<any> {
    return this.http.get(`/TransferStores/getAllTransferStores`)
  }
  // get all transfer item details
  getInvTransferItemDetailsAgainstInvTransferId(INV_TRANSFER_ITEMS_ID: string | number = null): Observable<any> {
    const queryParam = INV_TRANSFER_ITEMS_ID ? `?INV_TRANSFER_ITEMS_ID=${INV_TRANSFER_ITEMS_ID}` : ''
    return this.http.get(`/transferItemsD/getAlltransferItemsD${queryParam}`)
  }
  /*insert transfer item details*/
  addInvTransferItemDetails(body: any): Observable<any> {
    return this.http.post(`/transferItemsD/inserttransferItemsD`, body)
  }
  /** Update */
  updateInvTransferItemDetails(INV_TRANSFER_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItemsD/updatetransferItemsDById/${INV_TRANSFER_ITEMS_ID}`, body)
  }
  /** Update stores items group no  data */
  updateInvtransferItemsDetails(INV_TRANSFER_ITEMS_D_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItemsD/updatetransferItemsDById/${INV_TRANSFER_ITEMS_D_ID}`, body)
  }

  /** Update stores items group no  data */
  patchInvTransferWF_RequestID(INV_TRANSFER_ID: string | number, body: { WF_REQUEST_ID: string | number }): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_TRANSFER_ID}`, body)
  }



  deleteInvTransfer(INV_TRANSFER_ID: string | number): Observable<any> {
    return this.http.post(`/transfer/deleteTRANSFER/${INV_TRANSFER_ID}`, {});
  }
  deleteInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number): Observable<any> {
    return this.http.post(`/transferItems/deleteTransferItems/${INV_TRANSFER_ITEMS_ID}`, {});
  }

  deleteInvTransferItemsDetails(INV_TRANSFER_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post(`/transferItemsD/deleteTransferItemsD/${INV_TRANSFER_ITEMS_D_ID}`, {});
  }

  addtransfer(body: any): Observable<any> {
    return this.http.post(`/transfer/insertTransfer`, body);
  }
  updatetransfer(TRANSFER_ID: string | number = null, body: any): Observable<any> {
    return this.http.post(`/transfer/UPDATETRANSFER/${TRANSFER_ID}`, body)
  }
  getallDocumentTypeList(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes/`)
  }

  getinvTransfer(STORES_ID: string | number = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/transfer/getTransfer${queryParam}`)
  }
  getAllInventoryPeriod(): Observable<any> {
    return this.http.get(`/InvPeriod/getAllInventoryPeriod`)
  }
}
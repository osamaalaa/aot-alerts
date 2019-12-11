/**
 * Application constants will be here
 */
export const CONSTANTS = {
  SUBSIDIARY_ID: 1,//TODO: Remove this field once subsidiary_id is implemented in all forms. 
  CREATED_BY: 1,//TODO: Remove this field once created_by is implemented in all forms. 
  DELETED_BY: 1,//TODO: Remove this field once deleted_by is implemented in all forms. 
  LOOKUPS: {
    itemKind: 189,
    itemClass: 190,
    itemNature: 191,
    bNature: 192,
    aliasType: 193,
    costmethod: 194,
    unitList: 125,
    units: 125,
    sourceType: 177,
    documentStatus: 176,
    issuePolicy:209,
    costmethodStore:202,
    pickingRule:208
  },
  status: {
    enabled: "1",
    disabled: "2"
  },
  INPUT_MAX: 99999999999999999999.99999,
  DOCUMENT_STATUS: {
    NEW: 11243,
    VALIDATED: 11244,
    CONFIRMED: 11245,
    CANCELLED: 11246
  },
  WORKFLOW:{
    ACTIONS: {
      NEW: 1,
      APPROVE: 2,
      REJECT: 3,
      ASK: 4,
      CLOSE: 5,
      PENDING: 6,
      READ: 7,
      OBJECTION: 8,
      REJECT_CLOSE: 9
    },
    REQUEST_TYPE:{
      INV_OPEN_BALANCE:72,
      INV_TRANSFER:76,
      RCV_DOCUMENT:73,
    },
    DOC_TYPE:{
        BALANCE_REQUEST: 9,
        FINAL_RECEIVING: 3,
        ISSUE_ORDER: 4,
        TRANSFER_REQUEST: 6,
        TRANSFER_RECEIVE: 7,
        STOCK_TAKING: 8,
        TMP_RECEIVING: 1,
        INSPECTION: 2,
        OPEN_BALANCE: 5
    }
  },
  DOCUMENT_TYPE_OPEN_BALANCE_ID: 5 //api : /DocTypes/getDocsTypes,
}
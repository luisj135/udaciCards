import * as Api from '../utils/api'

export const INIT_ITEM_DESK = 'INIT_ITEM_DESK'
export const ALL_ITEM_DESK = 'ALL_ITEM_DESK'
export const ADD_ITEM_DESK = 'ADD_ITEM_DESK'
export const EDIT_ITEM_DESK = 'EDIT_ITEM_DESK'
export const DELETE_ITEM_DESK = 'DELETE_ITEM_DESK'
export const ALL_ITEM_CARD = 'ALL_ITEM_CARD'
export const ADD_ITEM_CARD = 'ADD_ITEM_CARD'
export const ADD_ITEM_POINT_CARD = 'ADD_ITEM_POINT_CARD'
export const EDIT_ITEM_CARD = 'EDIT_ITEM_CARD'
export const DELETE_ITEM_CARD = 'DELETE_ITEM_CARD'


export function initDesks (data) {
    return {
        type: INIT_ITEM_DESK,
        data
    }
}

export function allDesks () {
    return {
        type: ALL_ITEM_DESK
    }
}


export function addDesk (key, desksObj) {
    return {
        type: ADD_ITEM_DESK,
        key,
        desksObj,
    }
}

export function editDesk (idDesks, title) {
    return {
        type: EDIT_ITEM_DESK,
        idDesks,
        title
    }
}

export function deleteDesk (idDesks) {
    return {
      type: DELETE_ITEM_DESK,
      idDesks,
    }
}

export function allCard (idDeks) {
  return {
    type: ALL_ITEM_CARD,
    idDeks,
  }
}

export function addCard (idDeks, cardnew) {
  return {
    type: ADD_ITEM_CARD,
    idDeks,
    cardnew,
  }
}

export function addCardPoints (idDeks, cardpoints) {
  return {
    type: ADD_ITEM_POINT_CARD,
    idDeks,
    cardpoints,
  }
}

export function editCard (idCard, idDeks) {
  return {
    type: EDIT_ITEM_CARD,
    idCard,
    idDeks,
    answer,
    question
  }
}

export function deleteCard (idCard, idDeks) {
  return {
    type: DELETE_ITEM_CARD,
    idCard,
    idDeks
  }
}

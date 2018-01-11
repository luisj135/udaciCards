import API from '../utils/api'
export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export function allCard (cardid) {
  return {
    type: ALL_ITEM,
    cardid,
  }
}

export function addCard (idDeks, cardnew) {
  return {
    type: ADD_ITEM,
    idDeks,
    cardnew,
  }
}

export function editCard (idCard, idDeks) {
  return {
    type: EDIT_ITEM,
    idCard,
    idDeks,
    answer,
    question
  }
}

export function deleteCard (idCard, idDeks) {
  return {
    type: DELETE_ITEM,
    idCard,
    idDeks
  }
}

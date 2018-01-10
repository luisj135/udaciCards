import * as cardsActions from '../actions/cards'

function cardsReducer (state = {}, action) {
  switch (action.type) {
    case cardsActions.ADD_ITEM :
      return {
        ...state,
        ...action.cardnew
      }
    case cardsActions.EDIT_ITEM :
      let datadek = state.deks.map((item, index) => {
        if (item.id === action.idDeks){
          let datacard = item.map((itemcar, indexcar) => {
            if (itemcar.id === action.idCard){
              item['title']= action.title
              item['question']= action.question
              item['timestamp']= Date.now()
            }
            return itemcar
          })
          item = datacard
        }
        return item
      })
      return {
        ...state,
        ...datadek,
      }
    case cardsActions.DELETE_ITEM :
      let datafiltred = state.deks.map((item, index) => {
        if (item.id === action.idDeks){
          let datafiltred = item.questions.filter((itemdata) => {
            return itemdata.id !== action.id
          })
          item = datafiltred
        }
        return item
      })
      return {
        ...state,
        ...datafiltred,
      }
    default :
      return state
  }
}

export default cardsReducer
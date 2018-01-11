import * as cardsActions from '../actions/cards'

function cardsReducer (state = {}, action) {
  switch (action.type) {
    case cardsActions.ADD_ITEM :
      console.log(state.desks)
      let datadeknew = state.desks.map((item, index) => {
        if (item.id === action.idDeks){
          item.questions = item.questions.concat(action.cardnew)
        }
        return item
      })
      return {
        ...state,
        ...datadeknew
      }
    case cardsActions.EDIT_ITEM :
      let datadek = state.desks.map((item, index) => {
        if (item.id === action.idDeks){
          let datacard = item.questions.map((itemcar, indexcar) => {
            if (itemcar.id === action.idCard){
              item['answer']= action.title
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
      let datafiltred = state.desks.map((item, index) => {
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
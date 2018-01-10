import * as deskActions from '../actions/desks'

function desksReducer (state = [], action) {   
  switch (action.type) {
    case deskActions.INIT_ITEM :
      return {
        ...state,
        ...action.data,
      }
    case deskActions.ADD_ITEM :
      return {
        ...state,
        ...action.data
      }

    case deskActions.EDIT_ITEM :
      let datadek = state.deks.map((item, index) => {
        if (item.id === action.idDesks){
          item['title']= action.title
          item['timestamp']= Date.now()
        }
        return item
      })
      return {
        ...state,
        ...datadek
      }

    case deskActions.DELETE_ITEM :
      let datafiltred = state.deks.filter((itemdata) => {
        return itemdata.id !== action.idDesks
      })
      item = datafiltred
      return {
        ...state,
        ...datafiltred,
      }
  default :
      return state
  }
}

export default desksReducer

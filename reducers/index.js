import {
  INIT_ITEM_DESK,
  ALL_ITEM_DESK,
  ADD_ITEM_DESK,
  EDIT_ITEM_DESK,
  DELETE_ITEM_DESK,
  ALL_ITEM_CARD,
  ADD_ITEM_CARD,
  ADD_ITEM_POINT_CARD,
  EDIT_ITEM_CARD,
  DELETE_ITEM_CARD

} from '../actions'

const initialState = {
  desks:{},
}

function reducer(state =  initialState, action = {}){

  const { post, page } = action
  switch (action.type){
    
    case INIT_ITEM_DESK :
      return {
        ...state,
        ...action.data,
      }
    case ADD_ITEM_DESK :
      state.desks[action.key]= action.desksObj
      return {
        ...state,
        ...state.desks
      }

    case EDIT_ITEM_DESK :
      let datadekdesk = state.deks.map((item, index) => {
        if (item.id === action.idDesks){
          item['title']= action.title
          item['timestamp']= Date.now()
        }
        return item
      })
      return {
        ...state,
        ...datadekdesk
      }

    case DELETE_ITEM_DESK :
      let datafiltreddesk = state.deks.filter((itemdata) => {
        return itemdata.id !== action.idDesks
      })
      item = datafiltred
      return {
        ...state,
        ...datafiltreddesk,
      }

    case ADD_ITEM_CARD :
      Object.keys(state.desks).map((item) => {
        const desks = state.desks[item]
        if (desks.id === action.idDeks){
          desks.questions.push(action.cardnew)
        }
      })
      return {
        ...state,
        ...state.desks
      }
    case ADD_ITEM_POINT_CARD:
    console.log(action.cardpoints)
      Object.keys(state.desks).map((item) => {
        const desks = state.desks[item]
        if (desks.id === action.idDeks){
          desks.points = action.cardpoints
        }
      })
      return {
        ...state,
        ...state.desks
      }
    case EDIT_ITEM_CARD :
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
    case DELETE_ITEM_CARD :
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

    default:{
      return state
    }
  }

}

export default reducer
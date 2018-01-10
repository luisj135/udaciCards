import { combineReducers } from 'redux'
import desks from './desks'
import cards from './cards'

export default combineReducers({
    desks,
    cards
})
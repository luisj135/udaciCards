import { AsyncStorage } from 'react-native'
//import initData from '../data/initialdata'

const DESKS = 'projectCards:desks';
const CARDS = 'projectCards:cards';

const Data = {
    'React': {
        id: 1,
        title: 'React',
        ico: '20.png',
        color: '#5b6374',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    'JavaScript': {
        id: 2,
        title: 'JavaScript',
        ico: '1.png',
        color: '#ec8557',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function initDesks () { 
    AsyncStorage.setItem(DESKS, JSON.stringify(Data));
}

export function fetchDesks () {
    return AsyncStorage.getItem(DESKS);
}
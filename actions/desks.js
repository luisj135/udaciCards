import * as Api from '../utils/api'

export const INIT_ITEM = 'INIT_ITEM'
export const ADD_INIT = 'ADD_DESK'
export const EDIT_INIT = 'EDIT_DESK'
export const DELETE_INIT = 'DELETE_DESK'

export function initDesks (data) {
    return {
        type: INIT_ITEM,
        data
    }
}


export function getDesk () {
    return dispatch => {
        Api.fetchDesks()
            .then((res) => {
                dispatch( initDesk(res) );
            });
    };
}

export function addDesk (desksObj) {
    return {
        type: ADD_ITEM,
        desksObj,
    }
}

export function editDesk (idDesks, title) {
    return {
        type: EDIT_ITEM,
        idDesks,
        title
    }
}

export function deleteDesk (idDesks) {
    return {
      type: DELETE_ITEM,
      idDesks,
    }
}

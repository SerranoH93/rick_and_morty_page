import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types"


export function addFav(character) {
    return {
        type: ADD_FAV,
        payload: character
    }
}

export function removeFav(character) {
    return {
        type: REMOVE_FAV,
        payload: character
    }
}

export function filterCards(gender) {
    return {
        type: FILTER,
        payload: gender
    }
}

export function orderCards(order) {
    return {
        type: ORDER,
        payload: order
    }
}
import * as actionTypes from "./constants"

export const incrementAction = (num) => ({
  type: actionTypes.INCREMENT,
  num
})

export const decrementAction = (num) => ({
  type: actionTypes.DECREMENT,
  num
})


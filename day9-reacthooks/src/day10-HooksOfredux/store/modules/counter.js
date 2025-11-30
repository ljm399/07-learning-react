import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        name: 'codecao'
    },
    reducers: {
        incrementAction: (state, { payload }) => {
            state.count += payload
        },
        decrementAction: (state, { payload }) => {
            state.count -= payload
        },
        changeNameAction: (state, { payload }) => {
            state.name = payload
        }
    }
})

export const { incrementAction, decrementAction } = counterSlice.actions
export default counterSlice.reducer
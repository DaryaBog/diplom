import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputData: {},
}

export const calculateDataSlice = createSlice({
    name: 'calculate',
    initialState,
    reducers: {
        addData: (state, action) => {
            const newData = {
                ...state.inputData,
                [action.payload.lable]: action.payload.text,
            }
            state.inputData = newData
        },
    }
});

export const { addData } = calculateDataSlice.actions;
export default calculateDataSlice.reducer;
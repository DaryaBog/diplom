import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputData: {},
    outputData: {}
}

export const calculateDataSlice = createSlice({
    name: 'calculate',
    initialState,
    reducers: {
        addInputData: (state, action) => {
            const newData = {
                ...state.inputData,
                [action.payload.lable]: Number(action.payload.text),
            }
            state.inputData = newData
        },
        addOutputData: (state, action) => {
            const newData = {
                ...state.outputData,
                [action.payload.lable]: Number(action.payload.number),
            }
            state.outputData = newData
        },
    }
});

export const { addInputData, addOutputData } = calculateDataSlice.actions;
export default calculateDataSlice.reducer;
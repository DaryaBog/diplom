import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: true,

    text: {
        title: '',
        subTitle: ''
    },
};

export const warningSlice = createSlice({
    name: "warning",
    initialState,
    reducers: {
        onOpen: (state, action) => {
            state.isVisible = true;
        },
        onClose: (state, action) => {
            state.isVisible = !state.isVisible;
        },
        setText: (state, action) => {
            console.log(action)
            state.text = action.payload;
        },
    },
});

export const {
    onOpen,
    onClose,
    setText,
} = warningSlice.actions;
export default warningSlice.reducer;

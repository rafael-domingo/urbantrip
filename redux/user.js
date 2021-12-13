import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    tripList: []
};

export const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUserState: (state, action) => {
            state = {...action.payload};
            return state;
        }
    }
})


export const {
    setUserState
} = userSlice.actions;

export default userSlice.reducer;

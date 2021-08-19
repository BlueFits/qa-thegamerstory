import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { serverURL } from "../../../config/Server";

//Thunks
export const authUser = createAsyncThunk("user/authUser", async (data) => {
    try {
        const response = await fetch(serverURL + "/api/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });
        if (!response.ok) {
            const errData = await response.json();
            return {err: errData.error};
        } else {
            const resData = await response.json();
            return resData;
        }
    } catch (err) {
        throw err;
    }
});

// Then, handle actions in your reducers:
const userSlice = createSlice({
    name: 'user',
    initialState: { 
        token: null,
        user: {},
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = {};
        }
    },
    extraReducers: {
        [authUser.fulfilled]: (state, action) => {
            if (!action.payload.err) {
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        }
    },
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;
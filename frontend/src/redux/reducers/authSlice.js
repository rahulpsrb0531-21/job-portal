
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { candidate: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { candidate, accessToken } = action.payload
            state.candidate = candidate
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token
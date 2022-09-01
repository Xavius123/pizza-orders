import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums';
import { RootState } from '../store/store';
import { login } from '../services/auth.service';

export interface AuthState {
    isLoginSuccessful: boolean;
    statusLogIn: AsyncRequestStatus;
}

const initialState: AuthState = {
    isLoginSuccessful: false,
    statusLogIn: AsyncRequestStatus.Idle
};

export const LoginAsync = createAsyncThunk('auth/Login', async () => {
    const response = await login();
    return response;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(LoginAsync.pending, (state) => {})
            .addCase(LoginAsync.fulfilled, (state, action) => {})
            .addCase(LoginAsync.rejected, (state) => {});
    }
});

export const AuthSelector = (state: RootState): any => state.auth;

export default authSlice.reducer;

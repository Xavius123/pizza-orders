import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums';
import { RootState } from '../store/store';
import { login } from '../services/auth.service';
import { Login } from '../models';

export interface AuthState {
    isLoginSuccessful: boolean;
    isAuthenticated: boolean;
    statusLogIn: AsyncRequestStatus;
    statusLogout: AsyncRequestStatus;
}

const initialState: AuthState = {
    isLoginSuccessful: false,
    isAuthenticated: false,
    statusLogIn: AsyncRequestStatus.Idle,
    statusLogout: AsyncRequestStatus.Idle,
};

export const LoginAsync = createAsyncThunk(
    'auth/Login',
    async (request: Login) => {
        const response = await login(request);
        return response;
    }
);

export const LogoutAsync = createAsyncThunk('auth/Logout', async () => {});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(LoginAsync.pending, (state) => {
                state.statusLogIn = AsyncRequestStatus.Pending;
            })
            .addCase(LoginAsync.fulfilled, (state) => {
                state.statusLogIn = AsyncRequestStatus.Fulfilled;
                state.isLoginSuccessful = true;
            })
            .addCase(LoginAsync.rejected, (state) => {
                state.statusLogIn = AsyncRequestStatus.Rejected;
            })
            // Logout
            .addCase(LogoutAsync.pending, (state) => {
                state.statusLogout = AsyncRequestStatus.Pending;
            })
            .addCase(LogoutAsync.fulfilled, (state) => {
                state.statusLogout = AsyncRequestStatus.Fulfilled;
                localStorage.clear();
                state.isLoginSuccessful = false;
            })
            .addCase(LogoutAsync.rejected, (state) => {
                state.statusLogout = AsyncRequestStatus.Rejected;
            });
    },
});

export const AuthSelector = (state: RootState): any => state.auth;

export default authSlice.reducer;

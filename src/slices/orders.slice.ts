import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums/async-request-status.enum';
import { AddOrders, DeleteOrder, GetOrders } from '../services';
import { RootState } from '../store/store';

export interface OrderState {
    orders: [];
    statusGetOrdersAsync: AsyncRequestStatus;
    statusAddOrdersAsync: AsyncRequestStatus;
    statusDeleteOrderAsync: AsyncRequestStatus;
}

const initialState: OrderState = {
    orders: [],
    statusGetOrdersAsync: AsyncRequestStatus.Idle,
    statusAddOrdersAsync: AsyncRequestStatus.Idle,
    statusDeleteOrderAsync: AsyncRequestStatus.Idle
};

export const GetOrdersAsync = createAsyncThunk('auth/GetOrder', async (request: string) => {
    const response = await GetOrders(request);
    return response;
});

export const AddOrdersAsync = createAsyncThunk('auth/AddOrder', async (request: string) => {
    const response = await AddOrders(request);
    return response;
});

export const DeleteOrderAsync = createAsyncThunk('auth/DeleteOrder', async (order: number) => {
    const response = await DeleteOrder(order);
    return response;
});

export const authSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Orders
            .addCase(GetOrdersAsync.pending, (state) => {})
            .addCase(GetOrdersAsync.fulfilled, (state, action) => {})
            .addCase(GetOrdersAsync.rejected, (state) => {})
            // Add Orders
            .addCase(AddOrdersAsync.pending, (state) => {})
            .addCase(AddOrdersAsync.fulfilled, (state, action) => {})
            .addCase(AddOrdersAsync.rejected, (state) => {})
            // Delete Orders
            .addCase(DeleteOrderAsync.pending, (state) => {})
            .addCase(DeleteOrderAsync.fulfilled, (state, action) => {})
            .addCase(DeleteOrderAsync.rejected, (state) => {});
    }
});

export const AuthSelector = (state: RootState): any => state.auth;

export default authSlice.reducer;

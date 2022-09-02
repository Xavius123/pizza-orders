import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums/async-request-status.enum';
import { OrderForm } from '../models';
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
    statusDeleteOrderAsync: AsyncRequestStatus.Idle,
};

export const GetOrdersAsync = createAsyncThunk('orders/GetOrder', async () => {
    const response = await GetOrders();
    return response;
});

export const AddOrdersAsync = createAsyncThunk(
    'orders/AddOrder',
    async (request: OrderForm) => {
        const response = await AddOrders(request);
        return response;
    }
);

export const DeleteOrderAsync = createAsyncThunk(
    'orders/DeleteOrder',
    async (order: number) => {
        const response = await DeleteOrder(order);
        return response;
    }
);

export const authSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Orders
            .addCase(GetOrdersAsync.pending, (state) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Pending;
            })
            .addCase(GetOrdersAsync.fulfilled, (state, action) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Fulfilled;
            })
            .addCase(GetOrdersAsync.rejected, (state) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Rejected;
            })
            // Add Orders
            .addCase(AddOrdersAsync.pending, (state) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Pending;
            })
            .addCase(AddOrdersAsync.fulfilled, (state, action) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Fulfilled;
            })
            .addCase(AddOrdersAsync.rejected, (state) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Rejected;
            })
            // Delete Orders
            .addCase(DeleteOrderAsync.pending, (state) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Pending;
            })
            .addCase(DeleteOrderAsync.fulfilled, (state, action) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Fulfilled;
                // find the index of the order thats been deleted and remove it from current orders
                // const orderList = orders.filter((data, i) => i !== indexToRemove);
            })
            .addCase(DeleteOrderAsync.rejected, (state) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Rejected;
            });
    },
});

export const AuthSelector = (state: RootState): any => state.auth;

export default authSlice.reducer;

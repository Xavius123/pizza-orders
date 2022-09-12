import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums/async-request-status.enum';
import { Order, OrderForm } from '../models';
import { AddOrders, DeleteOrder, GetOrders } from '../services';
import { RootState } from '../store/store';

export interface OrdersState {
    orders: Order[];
    statusGetOrdersAsync: AsyncRequestStatus;
    statusAddOrdersAsync: AsyncRequestStatus;
    statusDeleteOrderAsync: AsyncRequestStatus;
}

const initialState: OrdersState = {
    orders: [],
    statusGetOrdersAsync: AsyncRequestStatus.Idle,
    statusAddOrdersAsync: AsyncRequestStatus.Idle,
    statusDeleteOrderAsync: AsyncRequestStatus.Idle,
};

export const GetOrdersAsync = createAsyncThunk('orders/GetOrder', async () => {
    const response = await GetOrders();
    return response;
});

export const AddOrderAsync = createAsyncThunk(
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

export const ordersSlice = createSlice({
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
                state.orders = action.payload.data;
            })
            .addCase(GetOrdersAsync.rejected, (state) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Rejected;
            })
            // Add Orders
            .addCase(AddOrderAsync.pending, (state) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Pending;
            })
            .addCase(AddOrderAsync.fulfilled, (state, action) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Fulfilled;
                const newOrder: Order = action.payload;
                // might need to map over return object to become correct model
                state.orders = [newOrder, ...state.orders];
            })
            .addCase(AddOrderAsync.rejected, (state) => {
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
                // reassign to state
            })
            .addCase(DeleteOrderAsync.rejected, (state) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Rejected;
            });
    },
});

export const OrderSelector = (state: RootState): any => state.orders;

export default ordersSlice.reducer;

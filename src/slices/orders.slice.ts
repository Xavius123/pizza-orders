import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from '../enums/async-request-status.enum';
import { toasterError, toasterSuccess } from '../helper';
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
    async (orderNumber: number) => {
        const response = await DeleteOrder(orderNumber);
        return response;
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state) => {
            state.orders = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Orders
            .addCase(GetOrdersAsync.pending, (state) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Pending;
            })
            .addCase(GetOrdersAsync.fulfilled, (state, action) => {
                state.statusGetOrdersAsync = AsyncRequestStatus.Fulfilled;
                state.orders = action.payload.data.reverse();
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

                const { status } = action.payload;
                if (status >= 200) {
                    toasterSuccess('Order Created');
                    const newOrder: Order = action.payload.data;
                    state.orders = [newOrder, ...state.orders];
                } else {
                    const { status } = action.payload.response;
                    const { detail } = action.payload.response.data;

                    if (status >= 400) {
                        toasterError(detail);
                    }
                }
            })
            .addCase(AddOrderAsync.rejected, (state) => {
                state.statusAddOrdersAsync = AsyncRequestStatus.Rejected;
                toasterError('Error');
            })
            // Delete Orders
            .addCase(DeleteOrderAsync.pending, (state) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Pending;
            })
            .addCase(DeleteOrderAsync.fulfilled, (state, action) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Fulfilled;
                const deletedOrderNumber = action.meta.arg;
                if (deletedOrderNumber) {
                    state.orders = [
                        ...state.orders.filter(
                            (order) => order.Order_ID !== deletedOrderNumber
                        ),
                    ];
                    toasterSuccess(`Order ${deletedOrderNumber} Removed`);
                }
            })
            .addCase(DeleteOrderAsync.rejected, (state) => {
                state.statusDeleteOrderAsync = AsyncRequestStatus.Rejected;
                toasterError('Error');
            });
    },
});

export const { setOrders } = ordersSlice.actions;
export const OrderSelector = (state: RootState): any => state.orders;

export default ordersSlice.reducer;

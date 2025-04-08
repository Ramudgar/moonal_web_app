import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Utils/Constant";
import api from "../../Utils/Api";

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (formData, { rejectWithValue }) => {
        try {
        const res = await api.post(API_ENDPOINTS.PRODUCT.CREATE, formData);
        return {
            ...res.data,
            message: 'Product created successfully!',
        };
        } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
        }
    }
    );


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        successMessage: '',
        error: null,
    },
    reducers: {
        resetProductState: (state) => {
            state.loading = false;
            state.successMessage = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message || 'Product created!';
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong.';
            });
    },
});
export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
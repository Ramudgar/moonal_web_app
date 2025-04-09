import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Utils/Constant";
import api from "../../Utils/Api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        API_ENDPOINTS.PRODUCT.CREATE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        } // 👈 Add this line
      );
      return {
        ...res.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// this is for getting all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_ENDPOINTS.PRODUCT.GET_ALL);
      // console.log("res", res);
      return res.data.data; // 👈 depends on your backend response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// this is for updating a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    // console.log("id", id);
    try {
      const res = await api.put(
        `${API_ENDPOINTS.PRODUCT.UPDATE(id)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    successMessage: "",
  },
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message || "Product created!";
        if (action.payload.product) {
          state.products.push(action.payload.product); // ✅ Add to list instantly
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong.";
      })

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload || [];
        state.successMessage = "Products fetched!";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message || "Product updated!";
        const index = state.products.findIndex(
          (product) => product._id === action.payload.data._id

        );
        if (index !== -1) {
          state.products[index] = action.payload.data; // Update the product in the list
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update product";
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface SliceState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// GET Products
export const ProductList = createAsyncThunk(
  "product/ProductList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// POST Product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct: Product, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

// PUT Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct: Product, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        updatedProduct
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// DELETE Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(ProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(ProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // POST
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // PUT
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p: any) => p.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ProductSlice.reducer;

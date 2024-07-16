import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsData } from "../interfaces";
import { RootState, AppDispatch } from "../store";

const initialState: ProductsData = {
  products: [],
  loading: false,
  error: false,
};

interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

export interface DataType {
  products: Product[];
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  AsyncThunkConfig
>("products/fetchProducts", async () => {
  const res = await fetch("data/data.json");
  const data: DataType = await res.json();
  return data["products"];
});

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;

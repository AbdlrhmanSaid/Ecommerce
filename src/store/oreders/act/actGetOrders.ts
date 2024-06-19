import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";
import { RootState } from "@store/index";
import { TOrderItem } from "@types";

type TResponse = TOrderItem[];

const actGetOrders = createAsyncThunk(
  "oreders/actGetOrders",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;
    const { auth } = getState() as RootState;
    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
        { signal }
      );
      return res.data;
    } catch (error) {
      rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Policy {
  id: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  premium: number;
  coverage: number;
}

interface PolicyState {
  policies: Policy[];
  loading: boolean;
  error: string | null;
}

const initialState: PolicyState = {
  policies: [],
  loading: false,
  error: null,
};

export const policySlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPolicies, setLoading, setError } = policySlice.actions;
export default policySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Claim {
  id: string;
  policyId: string;
  type: string;
  status: string;
  submissionDate: string;
  amount: number;
  description: string;
}

interface ClaimState {
  claims: Claim[];
  loading: boolean;
  error: string | null;
}

const initialState: ClaimState = {
  claims: [],
  loading: false,
  error: null,
};

export const claimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaims: (state, action: PayloadAction<Claim[]>) => {
      state.claims = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setClaims, setLoading, setError } = claimSlice.actions;
export default claimSlice.reducer;

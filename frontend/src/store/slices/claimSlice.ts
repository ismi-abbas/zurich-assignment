import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  status: string;
  submissionDate: string;
  amount: number;
  description: string;
}

interface ClaimsState {
  claims: Claim[];
  selectedClaim: Claim | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: string | null;
    type: string | null;
    dateRange: {
      start: string | null;
      end: string | null;
    };
  };
  sort: {
    field: keyof Claim | null;
    direction: "asc" | "desc";
  };
  searchQuery: string;
}

const initialState: ClaimsState = {
  claims: [],
  selectedClaim: null,
  loading: false,
  error: null,
  filters: {
    status: null,
    type: null,
    dateRange: {
      start: null,
      end: null,
    },
  },
  sort: {
    field: null,
    direction: "desc",
  },
  searchQuery: "",
};

export const fetchClaims = createAsyncThunk(
  "claims/fetchClaims",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/claim");
      const data = await response.json();
      return data.data;
    } catch {
      return rejectWithValue("Failed to fetch claims");
    }
  }
);

export const fetchClaimById = createAsyncThunk(
  "claims/fetchClaimById",
  async (claimId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/claim/${claimId}`
      );
      const data = await response.json();
      return data.data;
    } catch {
      return rejectWithValue("Failed to fetch claim");
    }
  }
);

export const createClaim = createAsyncThunk(
  "claims/createClaim",
  async (claim: Omit<Claim, "id">, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claim),
      });
      const data = await response.json();
      return data.data;
    } catch {
      return rejectWithValue("Failed to create claim");
    }
  }
);

export const updateClaim = createAsyncThunk(
  "claims/updateClaim",
  async (
    { id, claim }: { id: string; claim: Partial<Claim> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/claim/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claim),
      });
      const data = await response.json();
      return data.data;
    } catch {
      return rejectWithValue("Failed to update claim");
    }
  }
);

export const deleteClaim = createAsyncThunk(
  "claims/deleteClaim",
  async (id: string, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:3000/api/claim/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch {
      return rejectWithValue("Failed to delete claim");
    }
  }
);

const claimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    clearSelectedClaim: (state) => {
      state.selectedClaim = null;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ClaimsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSort: (state, action: PayloadAction<ClaimsState["sort"]>) => {
      state.sort = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Claims
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Claim by ID
      .addCase(fetchClaimById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaimById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClaim = action.payload;
      })
      .addCase(fetchClaimById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Claim
      .addCase(createClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClaim.fulfilled, (state, action) => {
        state.loading = false;
        state.claims.unshift(action.payload);
      })
      .addCase(createClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Claim
      .addCase(updateClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClaim.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.claims.findIndex(
          (claim) => claim.id === action.payload.id
        );
        if (index !== -1) {
          state.claims[index] = action.payload;
        }
        if (state.selectedClaim?.id === action.payload.id) {
          state.selectedClaim = action.payload;
        }
      })
      .addCase(updateClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Claim
      .addCase(deleteClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClaim.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = state.claims.filter(
          (claim) => claim.id !== action.payload
        );
        if (state.selectedClaim?.id === action.payload) {
          state.selectedClaim = null;
        }
      })
      .addCase(deleteClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedClaim,
  setFilters,
  clearFilters,
  setSort,
  setSearchQuery,
} = claimSlice.actions;

export default claimSlice.reducer;

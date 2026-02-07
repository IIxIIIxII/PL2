import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPoniesApi, fetchPonyByIdApi } from "../../api/poniesApi";


export const fetchPonies = createAsyncThunk(
    "ponies/fetchAll",
    async () => {
        return await fetchPoniesApi();
    }
);


export const fetchPonyById = createAsyncThunk(
    "ponies/fetchById",
    async (id) => {
        return await fetchPonyByIdApi(id);
    }
);

const poniesSlice = createSlice({
    name: "ponies",
    initialState: {
        items: [],
        selectedPony: null,
        status: "idle",
        error: null
    },
    reducers: {
        clearSelectedPony(state) {
            state.selectedPony = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // список
            .addCase(fetchPonies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPonies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchPonies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // одного пони
            .addCase(fetchPonyById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPonyById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPony = action.payload;
            })
            .addCase(fetchPonyById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { clearSelectedPony } = poniesSlice.actions;
export default poniesSlice.reducer;

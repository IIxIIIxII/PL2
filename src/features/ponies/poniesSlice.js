import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchPoniesApi,
    fetchPonyByIdApi,
    createPonyApi,
    updatePonyApi,
    deletePonyApi,
} from "../../api/poniesApi";


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

export const createPony = createAsyncThunk(
    "ponies/create",
    async (pony) => {
        return await createPonyApi(pony);
    }
);

export const updatePony = createAsyncThunk(
    "ponies/update",
    async ({ id, updates }) => {
        return await updatePonyApi(id, updates);
    }
);

export const deletePony = createAsyncThunk(
    "ponies/delete",
    async (id) => {
        return await deletePonyApi(id);
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

        // create
        builder
            .addCase(createPony.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPony.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createPony.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // update
            .addCase(updatePony.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePony.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map((p) => (Number(p.id) === Number(action.payload.id) ? action.payload : p));
                if (state.selectedPony && Number(state.selectedPony.id) === Number(action.payload.id)) {
                    state.selectedPony = action.payload;
                }
            })
            .addCase(updatePony.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // delete
            .addCase(deletePony.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePony.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter((p) => Number(p.id) !== Number(action.payload));
                if (state.selectedPony && Number(state.selectedPony.id) === Number(action.payload)) {
                    state.selectedPony = null;
                }
            })
            .addCase(deletePony.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { clearSelectedPony } = poniesSlice.actions;
export default poniesSlice.reducer;

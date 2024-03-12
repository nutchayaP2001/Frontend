import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Login Admin
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('https://dark-erin-gharial-ring.cyclic.app/api/login', {
            userEmail: user.userEmail,
            userPass: user.userPass
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('https://dark-erin-gharial-ring.cyclic.app/api/me');
        // console.log(response.data)
        return response.data;
        
    } catch (error) {
        console.log(error)
        if(error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Login Customer
export const LoginCus = createAsyncThunk("cus/LoginCus", async(cus, thunkAPI) => {
    try {
        const response = await axios.post('https://dark-erin-gharial-ring.cyclic.app/api/logincus', {
            CusUsername: cus.CusUsername,
            CusPass: cus.CusPass
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMeCustomer = createAsyncThunk("cus/getMeCustomer", async(_, thunkAPI) => {
    try {
        const response = await axios.get('https://dark-erin-gharial-ring.cyclic.app/api/mecustomer');
        return response.data;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
       await axios.delete('https://dark-erin-gharial-ring.cyclic.app/api/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Customer
        builder.addCase(LoginCus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginCus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cus = action.payload;
        });
        builder.addCase(LoginCus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Get Customer Login
        builder.addCase(getMeCustomer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMeCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cus = action.payload;
        });
        builder.addCase(getMeCustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });


    }
});





export const {reset} = authSlice.actions;
export default authSlice.reducer;

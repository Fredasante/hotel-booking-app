import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExchangeRates = {
  [key: string]: number;
};

export type CurrencyState = {
  selectedCurrency: string;
  availableCurrencies: string[];
  exchangeRates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
};

const initialState: CurrencyState = {
  selectedCurrency: "USD",
  availableCurrencies: [],
  exchangeRates: null,
  loading: false,
  error: null,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },
    fetchCurrencyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCurrencySuccess: (state, action: PayloadAction<string[]>) => {
      state.availableCurrencies = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchCurrencyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchExchangeRatesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExchangeRatesSuccess: (
      state,
      action: PayloadAction<ExchangeRates>
    ) => {
      state.exchangeRates = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchExchangeRatesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedCurrency,
  fetchCurrencyStart,
  fetchCurrencySuccess,
  fetchCurrencyFailure,
  fetchExchangeRatesStart,
  fetchExchangeRatesSuccess,
  fetchExchangeRatesFailure,
} = currencySlice.actions;

export default currencySlice.reducer;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExchangeRatesStart,
  fetchExchangeRatesSuccess,
  fetchExchangeRatesFailure,
} from "../redux/currency/currencySlice";
import { RootState } from "../redux/store";

const APP_ID = import.meta.env.VITE_APP_ID;

const ExchangeRateFetcher: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCurrency } = useSelector(
    (state: RootState) => state.currency
  );

  useEffect(() => {
    const fetchExchangeRates = async () => {
      dispatch(fetchExchangeRatesStart());

      try {
        const response = await fetch(
          "https://openexchangerates.org/api/latest.json?app_id=" + APP_ID
        );
        const data = await response.json();
        dispatch(fetchExchangeRatesSuccess(data.rates));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchExchangeRatesFailure(err.message));
        } else {
          dispatch(fetchExchangeRatesFailure("An unknown error occurred"));
        }
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency, dispatch]);

  return null;
};

export default ExchangeRateFetcher;

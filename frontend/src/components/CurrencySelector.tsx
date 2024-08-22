import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCurrency,
  fetchCurrencyStart,
  fetchCurrencySuccess,
  fetchCurrencyFailure,
} from "../redux/currency/currencySlice";
import { RootState } from "../redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const APP_ID = import.meta.env.VITE_APP_ID;

const CurrencySelector: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCurrency, availableCurrencies, loading, error } = useSelector(
    (state: RootState) => state.currency
  );

  useEffect(() => {
    const fetchCurrencies = async () => {
      dispatch(fetchCurrencyStart());

      try {
        const response = await fetch(
          "https://openexchangerates.org/api/currencies.json?app_id=" + APP_ID
        );
        const data = await response.json();
        dispatch(fetchCurrencySuccess(Object.keys(data)));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchCurrencyFailure(err.message));
        } else {
          dispatch(fetchCurrencyFailure("An unknown error occurred"));
        }
      }
    };

    fetchCurrencies();
  }, [dispatch]);

  const handleSelectValueChange = (value: string) => {
    dispatch(setSelectedCurrency(value));
  };

  if (loading) return <p className="text-white mr-3">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mr-3">
      <Select
        defaultValue={selectedCurrency}
        onValueChange={handleSelectValueChange}
      >
        <SelectTrigger className="w-[90px] text-white border-none hover:bg-[#0143a7] transition duration-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableCurrencies.map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;

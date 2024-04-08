import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "../lib/store";

export const useDispatch = () => useReduxDispatch<AppDispatch>();

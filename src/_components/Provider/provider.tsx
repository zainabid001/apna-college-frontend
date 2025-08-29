"use client";

import { Provider } from "react-redux";
import { store } from "@/_store/store";

export function Providers({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
}
import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { get: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.get = {};
  for (let k of Object.keys(store.getState())) {
    (store.get as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const formatShowtime = (showtime: string) => {
  if (!showtime) return "";
  const date = new Date(showtime);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${day} ${month} ${year} ${hour}:${minute} ${ampm}`;
};

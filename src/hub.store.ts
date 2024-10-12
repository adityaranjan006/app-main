import { create } from "zustand";

interface State {
  connected: boolean;
  on: boolean;
  value: number;
  solonoidOn: boolean;
}

export const useHubState = create<State>((set) => ({
  connected: false,
  on: false,
  value: 0,
  solonoidOn: false,
}));

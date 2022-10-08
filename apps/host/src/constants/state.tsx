import { createContext } from "@builder.io/qwik";

export interface AppState {
  showSeams: boolean
}

export const GlobalAppState = createContext<AppState>("AppState");
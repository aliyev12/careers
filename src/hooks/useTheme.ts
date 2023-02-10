"use client";

import { EMode } from "@/interfaces";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useTheme() {
  const { state, setState } = useContext(GlobalContext);

  function toggleMode() {
    const newMode = state.mode === EMode.dark ? EMode.light : EMode.dark;
    setState({ ...state, mode: newMode });

    // setState((oldState) => {
    //   const newMode = oldState.mode === EMode.dark ? EMode.light : EMode.dark;
    //   return { ...oldState, mode: newMode };
    // });
  }

  return { mode: state.mode, toggleMode };
}

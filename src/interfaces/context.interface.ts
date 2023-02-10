export enum EMode {
  dark = "dark",
  light = "light",
}

export interface IGlobalContextState {
  mode: EMode;
}

export interface IGlobalContextValue {
  state: IGlobalContextState;
  setState: React.Dispatch<React.SetStateAction<IGlobalContextState>>;
}

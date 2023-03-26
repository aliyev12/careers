import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useAuth() {
  const { state, setState } = useContext(GlobalContext);
  // const router = useRouter();

  return {
    user: state.user,
  };
}

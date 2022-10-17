import { UserData } from "../../utils/firebase/firebase.store.utils";
import { RootState } from "../store";

export const selectCurrentUser = (state: RootState): UserData => state.user.currentUser;
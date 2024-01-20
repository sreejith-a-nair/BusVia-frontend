
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../user.model";

const getuserstate = createFeatureSelector<UserModel>('user');

export const getuserlist = createSelector(getuserstate,(state)=>{
    return state.list;
})
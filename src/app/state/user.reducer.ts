import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import { loadUserFail, loadUsersSuccess } from "./user.action";


const _UserReducer = createReducer(UserState,
    on(loadUsersSuccess,(state, action)=>{
        return{
            ...state,
            list:[...action.list],
            errormessage: ''
        }
    }),
    on(loadUserFail,(state,action)=>{
        return{
            ...state,
            list:[],
            errormessage: action.errormessage
        }
    })
)

export function UserReducer(state:any, action: any){

    return _UserReducer(state,action);
}
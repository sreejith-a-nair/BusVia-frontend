import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';         

export const loadUser = createAction('[user page]load user');

export const loadUsersSuccess = createAction('[user page]load user success',props<{list:User[]}>());

export const loadUserFail = createAction('[user page]load user failure',props<{errormessage:string}>());
import * as constAction from "../consts/index";

const showListReducers = (state = {applIds :[], isTodoClass: true}, action) => {

  switch(action.type) {
    case constAction.SHOWLIST_CLEAR:
      state =  {applIds :[], isTodoClass: true} 
      return state;

    case constAction.UPDATE_SHOWLIST:
      state = {...state, applIds: action.content}
      return state;

    case constAction.SET_TODO_SHOWLIST:
      state = {...state, isTodoClass: action.content}
      return state;

    default:
      return state;
  }
};


export default showListReducers;
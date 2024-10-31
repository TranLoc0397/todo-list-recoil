import { atom } from "recoil";
export const todoListState = atom({
  key: "todoList",
  default: [],
});

export const todoItemInfo = atom({
    key: "itemInfo",
    default: {
        title: "",
        description:"",
        type:"add"
    },
  });

export const todoListFilterState = atom({
  key: 'TodoListFilter',
  default: 'all',
});


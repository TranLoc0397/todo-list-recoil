import { atom } from "recoil";
export const todoListState = atom({
  key: "todoList",
  default: [
    {
      id: 1,
      icon: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      title: "Apply for leave",
      description: "Leave for personal reason",
      isComplete: true,
    },
    {
      id: 2,
      icon: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      title: "Apply for leave",
      description: "Leave for personal reason",
      isComplete: false,
    },
    {
      id: 3,
      icon: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      title: "Apply for leave",
      description: "Leave for personal reason",
      isComplete: false,
    },
  ],
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


export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface MenuType {
  title: string;
  /*eslint-disable*/
  items: Array<any>;
}

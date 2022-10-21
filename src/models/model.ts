export interface IModel {
  id: number;
  name: string;
  code: string;
  type: string;
  cost: number;
  category: string;
  descripton: string;
  imageLink: string;
}

export interface INote {
  id: number;
  username: string;
  date: string;
  details: string;
}

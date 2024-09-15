import { UserModel } from "./userModel";

export interface ItemModel {
  itemId: number;
  itemName: string;
  user: UserModel;
}

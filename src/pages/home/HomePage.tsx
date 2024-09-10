import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { ItemModel } from "../../models/itemModel";
import { useEffect, useState } from "react";
import {
  createItem,
  deleteItem,
  fetchItem,
  nullifyItem,
  updateItem,
} from "../../reducers/item/itemSlice";
import InputBar from "../../components/InputBar";

export default function Home() {
  const { itemData } = useSelector((state: RootState) => state.item);
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<typeof store.dispatch>();
  const [itemNameCreate, setItemNameCreate] = useState("");
  const [itemNameUpdate, setItemNameUpdate] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(0);
  const addItemModal = document.getElementById(
    "add_item_modal"
  ) as HTMLDialogElement;
  const updateItemModal = document.getElementById(
    "update_item_modal"
  ) as HTMLDialogElement;

  const handleCreateItem = async (itemName: string) => {
    if (itemName != "") {
      try {
        let item = {
          itemName: itemName,
          userId: userData?.userId,
        };
        await dispatch(createItem(item));
      } catch (err) {
        console.log(err);
      }
      addItemModal.close();
      setIsCreating(!isCreating);
      setItemNameCreate("");
    }
  };

  const handleUpdateClick = (itemData: ItemModel) => {
    setSelectedItem(itemData.itemName);
    setSelectedItemId(itemData.itemId);
    updateItemModal.showModal();
  };

  const handleUpdate = async (itemName: string) => {
    if (itemName != "") {
      let item = {
        itemId: selectedItemId,
        itemName: itemName,
      };
      await dispatch(updateItem(item));
      setIsUpdating(!isUpdating);
      updateItemModal.close();
      setItemNameUpdate("");
    }
  };

  const handleDelete = async (itemId: number) => {
    await dispatch(deleteItem(itemId));
    if (itemData.length === 1) {
      dispatch(nullifyItem());
    }
    setIsDeleting(!isDeleting);
  };

  function handleItemNameCreate(itemName: string) {
    setItemNameCreate(itemName);
  }

  function handleItemNameUpdate(itemName: string) {
    setItemNameUpdate(itemName);
  }

  useEffect(() => {
    if (isLoggedIn && userData != null) {
      dispatch(fetchItem(userData.userId));
    }
  }, [isDeleting, isLoggedIn, isCreating, isUpdating]);

  function AddItemModal() {
    return (
      <dialog id="add_item_modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => addItemModal.close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add Item!</h3>
          <div className="dialog">
            <InputBar
              colorWhite={true}
              labelName="Item Name"
              handleChange={handleItemNameCreate}
              valueText={itemNameCreate}
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => handleCreateItem(itemNameCreate)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }

  function UpdateItemModal() {
    return (
      <dialog id="update_item_modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => updateItemModal.close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Update Item!</h3>
          <div className="dialog">
            <InputBar
              colorWhite={true}
              labelName="Item Name"
              handleChange={handleItemNameUpdate}
              placeholderText={selectedItem}
              valueText={itemNameUpdate}
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => handleUpdate(itemNameUpdate)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="w-screen flex justify-center">
            <button
              onClick={() => addItemModal.showModal()}
              className="btn btn-wide"
            >
              Add Item
            </button>
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>ItemName</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {itemData != null && itemData.length > 0 ? (
                  itemData.map((value: ItemModel) => {
                    return (
                      <tr key={value.itemId} className="hover">
                        <th>{value.itemId}</th>
                        <td>{value.itemName}</td>
                        <td>
                          <button
                            onClick={() => handleUpdateClick(value)}
                            className="btn btn-info"
                          >
                            Update
                          </button>
                          <button
                            className="ml-5 btn btn-error"
                            onClick={() => handleDelete(value.itemId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={3} className="text-center">
                        No Item Available
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <label className="flex justify-center h-[200px] items-center text-xl">
          Please Login First!
        </label>
      )}
      {AddItemModal()}
      {UpdateItemModal()}
    </>
  );
}

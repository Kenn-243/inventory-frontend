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
import Swal from "sweetalert2";
import ErrorPopup from "../../components/ErrorPopup";
import SuccessPopup from "../../components/Success";

export default function Home() {
  const { itemData, isSuccessful, isError, errorMessage } = useSelector(
    (state: RootState) => state.item
  );
  const { isLoggedIn, userData, isLoggedOut } = useSelector(
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
  const [info, setInfo] = useState({
    itemId: 0 as number,
    itemName: "" as string,
    userId: 0 as number | undefined,
    username: "" as string | undefined,
    userEmail: "" as string | undefined,
  });

  const addItemModal = document.getElementById(
    "add_item_modal"
  ) as HTMLDialogElement;
  const updateItemModal = document.getElementById(
    "update_item_modal"
  ) as HTMLDialogElement;
  const infoItemModal = document.getElementById(
    "info_item_modal"
  ) as HTMLDialogElement;

  const handleCreateItem = async (itemName: string) => {
    if (itemName != "") {
      try {
        let item = {
          itemName: itemName,
          user: {
            userId: userData?.userId,
          },
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

  const handleInfo = (
    itemId: number,
    itemName: string,
    userId: number | undefined,
    username: string | undefined,
    userEmail: string | undefined
  ) => {
    setInfo({ itemId, itemName, userId, username, userEmail });
    infoItemModal.showModal();
  };

  const handleDeleteClick = async (itemId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      handleDelete(itemId);
      if (isSuccessful) {
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success",
        });
      }
    }
  };

  function handleItemNameCreate(itemName: string) {
    setItemNameCreate(itemName);
  }

  function handleItemNameUpdate(itemName: string) {
    setItemNameUpdate(itemName);
  }

  useEffect(() => {
    if (isLoggedIn && userData != null) {
      dispatch(fetchItem());
    }
  }, [isDeleting, isLoggedIn, isCreating, isUpdating]);

  useEffect(() => {
    if (isError) {
      ErrorPopup(errorMessage);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccessful || isLoggedOut) {
      SuccessPopup();
    }
  }, [isSuccessful, isLoggedOut]);

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

  function InfoItemModal() {
    return (
      <dialog id="info_item_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-2xl font-semibold mb-4">Item Information</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-700">
                  Item Id:
                </span>
                <span className="text-gray-900">{info.itemId}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-700">
                  Item Name:
                </span>
                <span className="text-gray-900">{info.itemName}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-700">
                  User Id:
                </span>
                <span className="text-gray-900">{info.userId}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-700">
                  Username:
                </span>
                <span className="text-gray-900">{info.username}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-700">
                  Email:
                </span>
                <span className="text-gray-900">{info.userEmail}</span>
              </div>
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
                  <th style={{ textAlign: "center" }}></th>
                  <th style={{ textAlign: "center" }}>ItemName</th>
                  <th style={{ textAlign: "center" }}>Username</th>
                  <th style={{ textAlign: "center" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {itemData != null && itemData.length > 0 ? (
                  itemData.map((value: ItemModel) => {
                    return (
                      <tr key={value.itemId} className="hover">
                        <th style={{ textAlign: "center" }}>{value.itemId}</th>
                        <td style={{ textAlign: "center" }}>
                          {value.itemName}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {value.user.username}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            onClick={() => handleUpdateClick(value)}
                            className="btn btn-info"
                          >
                            Update
                          </button>
                          <button
                            className="ml-5 btn btn-error"
                            onClick={() => handleDeleteClick(value.itemId)}
                          >
                            Delete
                          </button>
                          <button
                            className="ml-5 btn btn-warning"
                            onClick={() =>
                              handleInfo(
                                value.itemId,
                                value.itemName,
                                userData?.userId,
                                userData?.username,
                                userData?.email
                              )
                            }
                          >
                            Info
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={4} className="text-center">
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
      {InfoItemModal()}
    </>
  );
}

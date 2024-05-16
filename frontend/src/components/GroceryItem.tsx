import { useState } from "react";
import GroceryItemForm from "./GroceryItemForm";
import Popup from "./ui/Popup";
import Table from "./ui/Table";
import { MdAdd, MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  deleteGrocery,
  getGroceries,
} from "../redux/features/grocery-item/groceryApi";
import { FaEdit } from "react-icons/fa";
import { TGroceryItemDto } from "../types/GroceryItem.type";
import { FiMinusCircle } from "react-icons/fi";
import Form from "./ui/Form";
import { useForm } from "react-hook-form";
import Input from "./ui/Input";
import { addSales } from "../redux/features/sales/salesApi";

const groceriesTableCol = [
  "S.N",
  "Name",
  "Cost Price",
  "Selling Price",
  "Quantity",
  "Action",
];

const GroceryItem = () => {
  const dispatch = useAppDispatch();
  const groceries = useAppSelector((state) => state.groceryReducer);
  const sales = useAppSelector((state) => state.salesReducer);
  const form = useForm<{ quantitySold: number }>({
    defaultValues: {
      quantitySold: 0,
    },
  });
  const [deleteGroceryId, setDeleteGroceryId] = useState<string | null>(null);
  const [soldeGroceryId, setSoldGroceryId] = useState<string | null>(null);
  const [editGroceryData, setEditGroceryData] =
    useState<TGroceryItemDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [soldConfirm, setSoldConfirm] = useState(false);
  const closeForm = () => {
    setShowForm(false);
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirm(false);
  };
  const closeSoldConfirm = () => {
    setSoldConfirm(false);
  };

  const deleteData = async () => {
    if (deleteGroceryId) {
      await dispatch(deleteGrocery(deleteGroceryId));
      await dispatch(getGroceries());
      setDeleteConfirm(false);
    }
  };

  const onSubmitHandler = async ({
    quantitySold,
  }: {
    quantitySold: number;
  }) => {
    const maxQuantity = groceries.data?.length
      ? groceries.data.find((grocery) => grocery._id === soldeGroceryId)
          ?.quantity
      : 0;

    if (!maxQuantity || quantitySold > maxQuantity) {
      form.setError("quantitySold", {
        type: "manual",
        message: `Max quantity is ${maxQuantity}`,
      });
    } else {
      await dispatch(addSales({ itemId: soldeGroceryId || "", quantitySold }));
      await dispatch(getGroceries());
      form.reset();
      closeSoldConfirm();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <h1 className="font-bold text-xl">Groceries</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-950 transition py-2 px-4 rounded"
        >
          <MdAdd /> Add
        </button>
      </div>
      <Table>
        <Table.Head tableColumn={groceriesTableCol} />
        <Table.Body>
          {groceries.data && groceries.data.length ? (
            groceries.data.map((grocery, i) => (
              <Table.Row key={i}>
                <Table.Col>{i + 1}</Table.Col>
                <Table.Col>{grocery.name}</Table.Col>
                <Table.Col>{grocery.costPrice}</Table.Col>
                <Table.Col>{grocery.sellingPrice}</Table.Col>
                <Table.Col>{grocery.quantity}</Table.Col>
                <Table.Col>
                  <div className="flex gap-2 items-center justify-center">
                    <FaEdit
                      size={20}
                      className="cursor-pointer text-green-800"
                      onClick={() => {
                        setEditGroceryData(grocery);
                        setShowForm(true);
                      }}
                    />
                    <MdDelete
                      onClick={() => {
                        setDeleteGroceryId(grocery._id || null);
                        setDeleteConfirm(true);
                      }}
                      size={20}
                      className="cursor-pointer text-red-800"
                    />
                    <FiMinusCircle
                      onClick={() => {
                        setSoldGroceryId(grocery._id || null);
                        setSoldConfirm(true);
                      }}
                      size={20}
                      className="cursor-pointer text-orange-800"
                    />
                  </div>
                </Table.Col>
              </Table.Row>
            ))
          ) : (
            <Table.Empty
              text={groceries.loading ? "Loading data..." : "NO data found"}
              colSpan={groceriesTableCol.length}
            />
          )}
        </Table.Body>
      </Table>
      <Popup showModal={showForm} onClose={closeForm}>
        <GroceryItemForm
          groceryData={editGroceryData}
          title={editGroceryData ? "Update Item" : "Add Item"}
          closeForm={closeForm}
        />
      </Popup>
      <Popup showModal={soldConfirm} onClose={closeSoldConfirm}>
        <div>
          <h1>Enter sold quantity for this item?</h1>
          <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <Form.FormGroup>
              <Input
                placeholder="0"
                name="quantitySold"
                register={form.register}
                required={true}
              />
              <Form.HelperText>
                {form.formState.errors.quantitySold?.message}
              </Form.HelperText>
            </Form.FormGroup>
            <Form.FormGroup>
              <button
                type="submit"
                disabled={sales.hasSubmitted}
                className="bg-blue-700 hover:bg-blue-900 transition text-white py-2 rounded"
              >
                {sales.hasSubmitted ? "Loading" : "Sold"}
              </button>
            </Form.FormGroup>
          </Form>
        </div>
      </Popup>
      <Popup showModal={deleteConfirm} onClose={closeDeleteConfirm}>
        <div>
          <h1 className="text-red-500 font-bold text-xl">
            Are you sure you want to delete this item?
          </h1>
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setDeleteGroceryId(null);
                closeDeleteConfirm();
              }}
              disabled={groceries.hasSubmitted}
              className="rounded bg-slate-500 hover:bg-slate-700 transition py-2 px-4 text-white"
            >
              Cancel
            </button>
            <button
              onClick={deleteData}
              disabled={groceries.hasSubmitted}
              className="rounded bg-red-500 hover:bg-red-700 transition py-2 px-4 text-white"
            >
              {groceries.hasSubmitted ? "Deleteing" : "Delete"}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default GroceryItem;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TGroceryItemDto } from "../types/GroceryItem.type";
import Form from "./ui/Form";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  addGrocery,
  getGroceries,
  updateGrocery,
} from "../redux/features/grocery-item/groceryApi";

const initialFormState: TGroceryItemDto = {
  name: "",
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
};

type TProps = {
  title: string;
  groceryData: TGroceryItemDto | null;
  closeForm: () => void;
};

const GroceryItemForm: React.FC<TProps> = ({
  title,
  closeForm,
  groceryData,
}) => {
  const dispatch = useAppDispatch();
  const grocery = useAppSelector((state) => state.groceryReducer);
  const form = useForm<TGroceryItemDto>({ defaultValues: initialFormState });

  const onSubmitHandler = async (data: TGroceryItemDto) => {
    groceryData
      ? await dispatch(updateGrocery(data))
      : await dispatch(addGrocery(data));
    form.reset();
    closeForm();
    await dispatch(getGroceries());
    alert(`${groceryData ? "Updated" : "Added"} Grocery`);
  };

  useEffect(() => {
    if (groceryData) {
      form.setValue("_id", groceryData._id);
      form.setValue("name", groceryData.name);
      form.setValue("costPrice", groceryData.costPrice);
      form.setValue("sellingPrice", groceryData.sellingPrice);
      form.setValue("quantity", groceryData.quantity);
    }
  }, [groceryData]);
  return (
    <div className="w-[400px] bg-primary tex-white p-4 rounded">
      <h1 className="text-center text-white text-bold text-2xl">{title}</h1>
      <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>Name</Form.Label>
            <Input
              placeholder="Item name"
              name="name"
              register={form.register}
              required={true}
            />
            <Form.HelperText>
              {form.formState.errors.name?.message}
            </Form.HelperText>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>Cost Price</Form.Label>
            <Input
              placeholder="Item name"
              name="costPrice"
              type="number"
              register={form.register}
              required={true}
            />
            <Form.HelperText>
              {form.formState.errors.costPrice?.message}
            </Form.HelperText>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>Selling Price</Form.Label>
            <Input
              placeholder="0"
              name="sellingPrice"
              register={form.register}
              required={true}
            />
            <Form.HelperText>
              {form.formState.errors.sellingPrice?.message}
            </Form.HelperText>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Label>Quantity</Form.Label>
            <Input
              placeholder="0"
              name="quantity"
              register={form.register}
              required={true}
            />
            <Form.HelperText>
              {form.formState.errors.quantity?.message}
            </Form.HelperText>
          </Form.FormGroup>
          <Form.FormGroup>
            <button
              type="submit"
              disabled={grocery.hasSubmitted}
              className="bg-blue-700 hover:bg-blue-900 transition text-white py-2 rounded"
            >
              {grocery.hasSubmitted
                ? "Loading..."
                : groceryData
                ? "Update"
                : "Add"}
            </button>
          </Form.FormGroup>
        </Form.FormGroup>
      </Form>
    </div>
  );
};

export default GroceryItemForm;

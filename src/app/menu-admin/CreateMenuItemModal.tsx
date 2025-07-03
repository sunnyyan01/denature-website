import { timeFormat } from "@/utils/format";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput } from "@heroui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { DBContext, StorageContext } from "../providers";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { TimeslotPicker } from "./TimeslotPicker";
import { ref, uploadBytes } from "firebase/storage";

interface CreateMenuItemModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  category: string;
  productId: string;
  updateMenuItem: Function;
}
export const CreateMenuItemModal: React.FC<CreateMenuItemModalProps> = ({
  open, setOpen, category, productId, updateMenuItem
}) => {
  const db = useContext(DBContext);
  const storage = useContext(StorageContext);

  const [product, setProduct] = useState<Record<string, any>>({});
  const updateProductField = (field: string, value: any) => {
    setProduct(prev => ({ ...prev, [field]: value }))
  };
  const updateNutritionInfo = (field: string, value: number) => {
    setProduct(prev => (
      { ...prev, nutrition_info: { ...prev.nutrition_info, [field]: value } }
    ));
  }
  const updateTimeslot = (idx: number, value: Timeslot) => {
    setProduct(prev => {
      prev.timeslots[idx] = value;
      return prev;
    });
  }
  const addTimeslot = (value: Timeslot) => {
    setProduct(prev => (
      { ...prev, timeslots: [...(prev.timeslots || []), value] }
    ));
  }
  const [productImage, setProductImage] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId == "new") {
      setProduct({});
      return;
    };
    const fetchProductData = async () => {
      setLoading(true);
      let productData = await getDoc(doc(db, "products", productId));
      setProduct({...productData.data()!, id: productId});
      setLoading(false);
    }
    fetchProductData();
  }, [productId])

  const submit = async () => {
    setLoading(true);
    let newId;
    if (productId == "new") {
      let docRef = await addDoc(collection(db, "products"), product);
      newId = docRef.id;
      updateMenuItem({ ...product, id: newId });
    } else {
      await setDoc(doc(db, "products", productId), product);
      newId = productId;
      updateMenuItem(product);
    }
    if (productImage) {
      await uploadBytes(ref(storage, `menu/${newId}`), productImage);
    }
    setLoading(false);
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h3>
            {
              productId == "new"
                ? "Create Menu Item"
                : "Edit Menu Item"
            }
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            <Input
              className="mb-2"
              label="Product Name"
              type="text"
              id="productName"
              value={product.name}
              onChange={(e) => updateProductField("name", e.target.value)}
            />

            <div className="mb-2">
              <label htmlFor="productImage">Image URL: </label>
              <input
                type="file"
                id="productImage"
                onChange={(e) => setProductImage(e.target.files![0])}
              />
            </div>

            <div className="flex flex-row justify-between mb-2">
              <NumberInput
                className="mr-2"
                label="Energy (cal)"
                value={product.nutrition_info?.energy}
                onValueChange={val => updateNutritionInfo("energy", val)}
              />
              <NumberInput
                className="mr-2"
                label="Fibre (g)"
                value={product.nutrition_info?.fibre}
                onValueChange={val => updateNutritionInfo("fibre", val)}
              />
              <NumberInput
                label="Protein (g)"
                value={product.nutrition_info?.protein}
                onValueChange={val => updateNutritionInfo("protein", val)}
              />
            </div>

            <Input
              className="mb-2"
              label="Main Grain"
              type="text"
              value={product.main_grain}
              onChange={(e) => updateProductField("main_grain", e.target.value)}
            />
            <Input
              className="mb-2"
              label="Protein"
              type="text"
              value={product.protein}
              onChange={(e) => updateProductField("protein", e.target.value)}
            />
            <Input
              className="mb-2"
              label="Vegetables"
              type="text"
              value={product.vegetables}
              onChange={(e) => updateProductField("vegetables", e.target.value)}
            />

            <Input
              className="mb-2"
              label="NSW Category"
              type="text"
              value={product.nsw_category}
              onChange={(e) => updateProductField("nsw_category", e.target.value)}
            />

            <NumberInput
              label="Price"
              value={product.price / 100}
              onValueChange={val => updateProductField("price", val * 100)}
              step={0.01}
              minValue={0}
            />

            <TimeslotPicker
              timeslots={product.timeslots || []}
              updateTimeslot={updateTimeslot}
              addTimeslot={addTimeslot}
            />

            <div className="flex justify-center">
              <Button
                className="mr-4"
                variant="solid"
                size="lg"
                isDisabled={loading}
                onPress={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                size="lg"
                isDisabled={loading}
                onPress={submit}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
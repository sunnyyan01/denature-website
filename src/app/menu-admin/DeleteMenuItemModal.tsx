import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useContext, useState } from "react";
import { DBContext, StorageContext } from "../providers";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

interface DeleteMenuItemModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  product: Product;
  deleteMenuItem: Function;
}
export const DeleteMenuItemModal: React.FC<DeleteMenuItemModalProps> = ({
  open, setOpen, product, deleteMenuItem
}) => {
  const db = useContext(DBContext);
  const storage = useContext(StorageContext);

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    await deleteDoc(doc(db, "products", product.id));
    await fetch(`/api/product/${product.id}`, {method: "DELETE"});
    await deleteObject(ref(storage, `menu/${product.id}`));

    setLoading(false);
    deleteMenuItem(product.id);
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen} size="xl">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-[#373D27]">
            Are you sure you want to delete the menu item "{product.name}"?
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-center">
            <Button
              className="bg-[#C0C95F] mr-4"
              variant="solid"
              size="lg"
              isDisabled={loading}
              onPress={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              className="bg-[#425A26] text-white"
              variant="solid"
              size="lg"
              isDisabled={loading}
              onPress={submit}
            >
              {loading ? 'Deleting...' : 'Yes'}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
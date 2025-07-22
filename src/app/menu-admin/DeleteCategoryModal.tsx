import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useContext, useState } from "react";
import { DBContext } from "../providers";
import { deleteDoc, doc } from "firebase/firestore";

interface DeleteCategoryModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  warning: boolean;
  categoryId: string;
  categoryName: string;
  deleteCategory: (id: string) => void;
}
export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  open, setOpen, warning, categoryId, categoryName, deleteCategory,
}) => {
  const db = useContext(DBContext);

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    await deleteDoc(doc(db, "categories", categoryId));

    setLoading(false);
    deleteCategory(categoryId);
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen} size="xl">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-[#373D27]">
            Are you sure you want to delete the category "{categoryName}"?
          </h3>
        </ModalHeader>
        <ModalBody>
          {warning && <p className="text-red-200">
            It is recommended to delete all products in this category first
            to save storage space.
          </p>}
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
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useContext, useState } from "react";
import { DBContext } from "../providers";
import { addDoc, collection } from "firebase/firestore";

interface CreateCategoryModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  createCategory: (id: string, name: string) => void;
}
export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  open, setOpen, createCategory,
}) => {
  const db = useContext(DBContext);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    let docRef = await addDoc(collection(db, "categories"), {name});

    setLoading(false);
    createCategory(docRef.id, name);
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen} size="xl">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-[#373D27]">
            Create Category
          </h3>
        </ModalHeader>
        <ModalBody>
          <Input
            label="Category Name"
            className="mb-2"
            onValueChange={setName}
          />
          <div className="flex justify-center">
            <Button
              className="bg-[#C0C95F] mr-4"
              variant="solid"
              size="lg"
              isDisabled={loading}
              onPress={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#425A26] text-white"
              variant="solid"
              size="lg"
              isDisabled={loading}
              onPress={submit}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
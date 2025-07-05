import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { useState } from "react";

export function OrderCancelModal({
  open, setOpen, confirmCancel,
}: {
  open: boolean,
  setOpen: (isOpen: boolean) => void,
  confirmCancel: Function,
}) {
  let [loading, setLoading] = useState(false);
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <ModalContent>
        <ModalBody>
          Are you sure you wish to cancel this order?
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onPress={() => {
              setLoading(true);
              confirmCancel()
                .then(() => {
                  setLoading(false);
                  setOpen(false);
                })
            }}
          >
            {loading ? "Please wait..." : "Yes"}
          </Button>
          <Button
            variant="bordered"
            onPress={() => setOpen(false)}
          >
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
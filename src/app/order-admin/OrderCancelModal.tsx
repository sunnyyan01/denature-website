import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { useState } from "react";

export function OrderCancelModal({
  open, setOpen, isPaid, confirmCancel,
}: {
  open: boolean,
  setOpen: (isOpen: boolean) => void,
  isPaid: boolean,
  confirmCancel: Function,
}) {
  let [loading, setLoading] = useState(false);
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <ModalContent>
        <ModalBody>
          <p>Are you sure you wish to cancel this order?</p>
          {isPaid && <p>This customer has paid, be sure to take down their details first to notify them and issue a refund.</p>}
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
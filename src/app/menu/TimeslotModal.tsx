import { timeFormat } from "@/utils/format";
import { HANDLING_TIME } from "@/utils/globals";
import { getCurTime } from "@/utils/time";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

interface TimeslotModalProps {
  timeslots: Array<Timeslot>;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  setTimeslot: (timeslot: number) => void;
  resetCart: () => void;
}
export const TimeslotModal: React.FC<TimeslotModalProps> = ({ timeslots, open, setOpen, setTimeslot, resetCart }) => {
  let [selected, setSelected] = useState(0);

  let slotList = useMemo(() => {
    let slotList = [];
    let now = getCurTime() + HANDLING_TIME;
    for (let timeslot of timeslots) {
      let {start, interval, end} = timeslot;
      let next = (
        start > now
        ? start
        : Math.ceil((now - start) / interval) * interval + start
      );
      let artificialEnd = Math.min(end, next + interval * 3);
      for (let t = next; t <= artificialEnd; t += interval) {
        slotList.push(t);
      }
    }
    return slotList.toSorted();
  }, [timeslots])
  useEffect(() => {
    setSelected(slotList[0] || 0);
  }, [slotList])

  let submit = () => {
    setTimeslot(selected);
    setOpen(false);
  }
  let close = () => {
    resetCart();
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onOpenChange={(isOpen) => {if (isOpen) close()}}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Please choose a delivery time</ModalHeader>
        <ModalBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                Timeslot: {" "}
                {selected == 0 ? "None selected" : timeFormat(selected)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Timeslot Menu" onAction={(key) => setSelected(key as number)}>
              {slotList.map(t => (
                <DropdownItem key={t}>{timeFormat(t)}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={close}>
            Cancel
          </Button>
          <Button color="primary" onPress={submit}>
            Select
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
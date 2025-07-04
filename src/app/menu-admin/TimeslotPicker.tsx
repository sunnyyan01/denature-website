import { getCurTime } from "@/utils/time";
import { Button, DatePicker, NumberInput } from "@heroui/react";
import { CalendarDateTime, parseDateTime } from '@internationalized/date';
import { CrossIcon, X } from "lucide-react";

interface TimeslotDispProps {
  timeslot: Timeslot;
  updateTimeslotField: Function;
  removeTimeslot: Function;
}

function cdtFromTimestamp(timestamp: number) {
  let date = new Date(timestamp * 1000);
  return parseDateTime(date.toISOString().slice(0, -1));
}
function cdtToTimestamp(cdt: CalendarDateTime) {
  return Math.floor(cdt.toDate('UTC').getTime() / 1000);
}

const SECS_IN_WEEK = 60 * 60 * 24 * 7;

const TimeslotDisp: React.FC<TimeslotDispProps> = ({
  timeslot, updateTimeslotField, removeTimeslot
}) => {
  return (
    <div>
      <div className="flex flex-row items-center mb-1">
        <DatePicker
          className="mr-2"
          label="Start Date/Time"
          defaultValue={cdtFromTimestamp(timeslot.start)}
          onChange={val => updateTimeslotField("start", cdtToTimestamp(val!))}
        />
        <DatePicker
          className="mr-2"
          label="End Date/Time"
          defaultValue={cdtFromTimestamp(timeslot.end)}
          onChange={val => updateTimeslotField("end", cdtToTimestamp(val!))}
        />
        <NumberInput
          label="Repeat every _ weeks"
          minValue={1}
          defaultValue={timeslot.interval / SECS_IN_WEEK}
          onChange={val => updateTimeslotField("interval", val as number * SECS_IN_WEEK)}
        />
        <Button
          size="sm" radius="full" isIconOnly variant="light"
          onPress={() => removeTimeslot()}
        >
          <X color="red" />
        </Button>
      </div>
    </div>
  )
}

interface TimeslotPickerProps {
  timeslots: Array<Timeslot>;
  updateTimeslot: Function;
  addTimeslot: Function;
  removeTimeslot: Function;
}

export const TimeslotPicker: React.FC<TimeslotPickerProps> = ({
  timeslots, updateTimeslot, addTimeslot, removeTimeslot
}) => {
  const addBlankTimeslot = () => {
    let randomTime = getCurTime();
    randomTime = Math.ceil(randomTime / 3600) * 3600; // Round to nearest hour
    addTimeslot({
      start: randomTime,
      interval: SECS_IN_WEEK,
      end: randomTime + SECS_IN_WEEK * 2,
    })
  }

  return (
    <div className="mb-2 flex flex-col justify-center">
      <p>Timeslots</p>
      {
        timeslots.map((timeslot, idx) => (
          <TimeslotDisp
            key={idx}
            timeslot={timeslot}
            updateTimeslotField={
              (field: string, val: number) => updateTimeslot(idx, { ...timeslot, [field]: val })
            }
            removeTimeslot={() => removeTimeslot(idx)}
          />
        ))
      }
      <Button
        className="mx-auto"
        onPress={addBlankTimeslot}
      >
        <CrossIcon /> Add Timeslot
      </Button>
    </div>
  )
}
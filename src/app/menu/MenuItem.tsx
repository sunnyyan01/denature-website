import React, { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import { Button, NumberInput } from '@heroui/react';
import { currencyFormat, timeFormat } from '@/utils/format';
import { StorageContext } from '../providers';
import { getDownloadURL, ref } from 'firebase/storage';
import { getCurTime } from '@/utils/time';
import { HANDLING_TIME } from '@/utils/globals';

const NutritionalInfoBox: React.FC<{ info: Record<string, string> }> = ({ info }) => (
  <div className='bg-[#C0C95F] rounded-xl p-2 text-sm flex flex-row justify-evenly text-center'>
    <p>Energy:<br />{info?.energy} kcal</p>
    <p>Protein:<br />{info?.protein}g</p>
    <p>Fibre:<br />{info?.fibre}g</p>
  </div>
)

interface MenuItemProps {
  item: Product;
  numInCart: number;
  setNumInCart: (num: number) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, numInCart, setNumInCart, }) => {
  let storage = useContext(StorageContext);
  let [imageURL, setImageURL] = useState("");
  let [nextAvail, setNextAvail] = useState(0);
  useEffect(() => {
    let fetchImage = async () => {
      let url = await getDownloadURL(ref(storage, `menu/${item.id}`));
      setImageURL(url);
    };
    fetchImage();
  }, [item.id]);
  useEffect(() => {
    let first = Infinity;
    let now = getCurTime() + HANDLING_TIME;
    for (let timeslot of item.timeslots) {
      let {start, interval, end} = timeslot;
      let next = (
        start > now
        ? start
        : Math.ceil((now - start) / interval) * interval + start
      );
      if (next > end) continue;
      if (next < first) first = next;
    }
    setNextAvail(first);
  }, [item.timeslots])

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl h-full flex flex-col">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageURL}
          alt={item.name}
          fill
          sizes="auto"
          className="object-cover rounded-t-xl"
          style={{ objectPosition: 'center 70%' }}
        />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <h3 className="mb-2 color-[#204B2A] font-semibold text-[18px] text-center">{item.name}</h3>
        <NutritionalInfoBox info={item.nutrition_info} />
        <p className="color-[#666] text-[14px]">Main Grain: {item.main_grain}</p>
        <p className="color-[#666] text-[14px]">Protein: {item.protein}</p>
        <p className="color-[#666] text-[14px]">Vegetables: {item.vegetables}</p>
        <p className="color-[#666] text-[14px]">NSW Category: {item.nsw_category}</p>
        <h4 className='text-center text-xl mt-auto'>{currencyFormat(item.price)}</h4>
        {
          numInCart == 0
            ? (
              <Button
                className='p-2 bg-[#425A26] text-white text-lg flex align-center rounded-lg'
                radius='sm'
                onPress={() => setNumInCart(1)}
                isDisabled={nextAvail == Infinity}
              >
                {nextAvail == Infinity ? "Unavailable" : "Add to cart"}
              </Button>
            ) : (
              <NumberInput
                label="Quantity" labelPlacement='outside-left'
                className=""
                value={numInCart} onValueChange={setNumInCart}
              />
            )
        }
        {
          numInCart == 0 && nextAvail != Infinity &&
          <p className='text-center'>Next available: {timeFormat(nextAvail)}</p>
        }
      </div>
    </div>
  )
}
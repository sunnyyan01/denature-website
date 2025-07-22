import React, { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import { Button, PressEvent } from '@heroui/react';
import { currencyFormat } from '@/utils/format';
import { getDownloadURL, ref } from 'firebase/storage';
import { StorageContext } from '../providers';

const NutritionInfoBox: React.FC<{ info: Record<string, number> }> = ({ info }) => (
  <div className='bg-[#C0C95F] rounded-xl p-2 text-sm flex flex-row justify-evenly text-center'>
    <p>Energy:<br />{info?.energy} kcal</p>
    <p>Protein:<br />{info?.protein}g</p>
    <p>Fibre:<br />{info?.fibre}g</p>
  </div>
)

interface MenuItemProps {
  item: Product;
  openEditModal: () => void;
  openDeleteModal: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = (
  { item, openEditModal, openDeleteModal }
) => {
  let storage = useContext(StorageContext);
  let [imageURL, setImageURL] = useState<string>("");
  useEffect(() => {
    let fetchImage = async () => {
      let url = await getDownloadURL(ref(storage, `menu/${item.id}`));
      setImageURL(url);
    };
    fetchImage();
  }, [item.id]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xl h-full flex flex-col">
      <div className="relative aspect-[4/3] w-full">
        {imageURL ? <Image
          src={imageURL}
          alt={item.name}
          fill
          sizes="auto"
          className="object-cover rounded-t-xl"
          style={{ objectPosition: 'center 70%' }}
        /> : <p>Loading image...</p>
        }
      </div>
      <div className="flex-1 flex flex-col p-5">
        <h3 className="mb-2 color-[#204B2A] font-semibold text-[18px] text-center">{item.name}</h3>
        <NutritionInfoBox info={item.nutrition_info} />
        <p className="color-[#666] text-[14px]">Main Grain: {item.main_grain}</p>
        <p className="color-[#666] text-[14px]">Protein: {item.protein}</p>
        <p className="color-[#666] text-[14px]">Vegetables: {item.vegetables}</p>
        <p className="color-[#666] text-[14px]">NSW Category: {item.nsw_category}</p>
        <h4 className='text-center text-xl mt-auto'>{currencyFormat(item.price)}</h4>
        <Button
          className='p-2 bg-[#425A26] text-white text-lg flex align-center rounded-lg mb-1'
          radius='sm'
          onPress={openEditModal}
        >
          Edit
        </Button>
        <Button
          variant='bordered'
          className='p-2 border-[#425A26] text-[#425A26] text-lg flex align-center rounded-lg'
          radius='sm'
          onPress={openDeleteModal}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
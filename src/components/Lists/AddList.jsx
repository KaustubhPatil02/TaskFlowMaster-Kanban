"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, XCircle } from 'lucide-react';
import InputForm from '../InputForm';
import { useUserActions } from '@/hooks/userActions';
import {toast} from 'sonner';
import { useRouter } from 'next/navigation';
import { createList } from '@/services';

const AddList = () => {
  const router = useRouter();

  const [editable, setEditable] = useState(false);


  const {result, errors} = useUserActions(createList,
    {
      onSuccess: (data) => {
        // toast.success("List added successfully");
        toast.success(`${data.title} added to list`);
        setEditable(false);
        router.refresh();
      },
  
    },
    {
      onError: (error) => {
        toast.error(error.message);
        toast.error(`${data.title} added to list`);
  
      }
    }
  )
  const clickSubmit = (data) => {
    const title= data.get("title");
    console.log(title,"Ek pyara bacha!");

  }

  if (editable) {
    return (
      <div className='pl-10'>
        <li className='shrink-0 h-full w-[270px] select-none'>
        <form
  action={clickSubmit}
  className='bg-white rounded-lg space-y-6 shadow-lg p-3'
>
  <InputForm id="title"
    className="text-sm px-2 py-1 h-7 border-transparent font-medium focus:outline-none hover:border-input focus:border-input transition"
    placeholder="List Name"
    errs={"errors"}
  />
  <div className="flex justify-between">
    <button
      type="submit"
      variant='secondary'
      size="sm"
      className="rounded-lg bg-black text-gray-200 p-2 hover:bg-gray-800"
    >
      Add
    </button>

    <button
      type="button" // Assuming this is for closing, so it's not a submit type
      className="rounded-lg bg-red-600 text-black p-2"
      onClick={() => setEditable(false)}
    >
      <XCircle/>
    </button>
  </div>
</form>
        </li>
      </div>

    )
  }

  return (
    <div className='pl-10'>
      <li className='shrink-0 h-full w-[270px] select-none'>
        <Button
          onClick={() => setEditable(true)}
          className="w-full rounded-lg bg-white text-black p-2 flex items-center font-medium text-sm mt-5"
          type="button"
        >
          <Plus className='' size={36} />  Add to List
        </Button>
      </li>
    </div>
  );
};

export default AddList;
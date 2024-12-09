"use client"
import { addUserEmailToProduct } from '@/lib/actions';
import { useParams } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react';


interface Props {
  productId: string
}
const Modal = ({ productId }: Props) => {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState('');
  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    //set loading state

    await addUserEmailToProduct(productId, email);
    //pause loading state
    setEmail('');
    closeModal();
  }

  return (
    <div>
      <button
        className="p-4 bg-black w-full rounded-xl text-white"
        onClick={openModal}
      >
        Track
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-6 bg-white w-96 shadow-lg relative -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]"
        onClick={closeModal}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">
          Stay updated with product pricing alerts!
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Never miss a bargain again with our timely alerts!
        </p>
        <form onClick={(e: React.MouseEvent)=> e.stopPropagation()}
          onSubmit={handleSubmit}
          >
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email address
          </label>
          <div className="flex items-center border border-gray-300 rounded mb-4">
            <span className="p-2">
              📧
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-xl"
          >
            Track
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;

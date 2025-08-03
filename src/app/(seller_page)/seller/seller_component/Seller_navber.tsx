'use client'
import { CustomToolTip } from '@/components/custom_compoent/CustomToolTip';
import { Input } from '@/components/ui/input';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6';
import { MdOutlineOutput } from 'react-icons/md';

const Seller_navber = ({ isOpen, setOpen }: {
    isOpen: boolean,
    setOpen: () => void
}) => {

    const toggleSidebar = () => {
        setOpen()
        console.log(isOpen)
    };
    return (
        <div className=' w-full bg-white py-5 px-6 flex items-center justify-between border-b-[0.01] border-b-slate-200 shadow-xl shadow-gray-500'>
            <div className=' flex items-center justify-start gap-6'>

                <button onClick={toggleSidebar} className=' text-2xl border border-slate-200 rounded-sm cursor-pointer active:bg-slate-100'>
                    {isOpen ? <FaAngleLeft className=' text-slate-600' /> : <FaAngleRight className=' text-slate-600' />}
                </button>
                <div>
                    <span className=' flex items-center justify-center gap-1'>
                        <p className=' text-xs text-gray-500 font-normal capitalize flex'>page {"/"}</p>

                        <p className=' text-xs text-gray-500 font-semibold capitalize'> {" "}Deahboard</p>
                    </span>

                    <p className=' text-gray-800 font-semibold text-xl'>Seller</p>
                </div>
            </div>
            <div className=' flex items-center justify-end text-black gap-4'>
                <div>
                    <Input type='search' placeholder='Search here..' className=' dark:text-slate-600 ' />
                </div>
                <div className=' flex -space-x-0.5 gap-1 items-center'>
                    <CustomToolTip
                        children={
                            <button className=' flex bg-gray-100 p-3 rounded-full cursor-pointer active:bg-gray-300 duration-150'>
                                <FaUser className=' text-gray-800' />
                            </button>
                        } bodyContent='Profile'
                    />
                    <button className=' flex p-3 rounded-full cursor-pointer active:bg-gray-300 duration-150'>
                        <CustomToolTip
                            children={<MdOutlineOutput className='text-lg text-gray-800' />} bodyContent='log out'
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Seller_navber



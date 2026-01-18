// import React from 'react';
import { Input } from 'antd';

type Props = {
  label: string;
  placeHolder: string;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
};

export default function RegistereForm( {label, placeHolder, className, value, type, name,onChange}: Props ) {
    return  (
        <>
        <div className='flex flex-col justify-center items-start'>

            <label htmlFor={label} className='my-1'>{label}</label>
            <Input 
                placeholder={placeHolder}  
                className={`rounded-lg bg-black/30 border-white/30 input ${className}`} 
                value={value}
                onChange={onChange}
                type={type}
                name={name}
            />
        </div>
        </>
    )
}
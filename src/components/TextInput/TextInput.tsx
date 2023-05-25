import React, { FC } from 'react';

import eye from '../../resources/icons/eye.png';
import eyeStrike from '../../resources/icons/eye_strike.png';

import { useForm } from 'react-hook-form';


interface TextInputProps {
    label?: string;
    requaired?: boolean;
    passwordToggle?: boolean;
    name: string;
    type: string;
    autoComplete?: 'off' | 'on';
}

const TextInput: FC<TextInputProps> = ({label, name = '', autoComplete, type, requaired = false, passwordToggle = false, ...props}) => {
    const icon = passwordToggle ? eye : eyeStrike;
     
    const { register } = useForm();

    return (
        <>
            <div className='label'>
                <label htmlFor={name}>
                    {label}
                    {passwordToggle ? (
                            <div className="eye"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                            >
                                <img src={icon} alt="eye" />
                            </div>
                        ) : null}
                </label>
                {requaired ? (<span>*</span>) : null}
            </div>
            {(
                <input 
                {...register(name)}
                {...props}
                type={type}
                autoComplete={autoComplete}
                />
            )}

        </>
    );
};

export default TextInput;
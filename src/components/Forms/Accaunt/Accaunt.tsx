import avatar from '../../../resources/img/avatar.svg'
import {useState, useId} from 'react'

import { formsSet } from '../../../store/idbStore';

import { IAccauntFormValues } from '../../types/types';

import './accaunt.scss'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { changeActiveForm } from '../../Pages/AddingNewUser/addingNewUserSlice';
import { useAppDispatch } from '../../../store';

const schema = yup.object().shape({
    userName: yup.string()
					.required('User Name is required'),
					// .test(
					// 	"USERNAME_MATCH",
					// 	"User name already exist",
					// 	(value) => !existedUsersName.includes(value) || value === editingUser.userName,
					// ),
		password: yup.string()
					.required(),
		repeatPassword: yup.string()
						.oneOf([yup.ref('password')], 'password don`t mutch')
})

const SUPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

const AccauntForm = () => {

    const dispatch = useAppDispatch();
    const id = useId();



    const { 
        register, 
        handleSubmit, 
        formState: {errors},
        setValue
    } = useForm<IAccauntFormValues>({
            resolver: yupResolver(schema)
    });

    const [image, setImage] = useState('');

    const [imageFormatError, setImageFormatError] = useState('');
    const [imageSizeError, setImageSizeError] = useState('')

    const imageSizeCheck = (size: number) => {
        return size <= 1024 * 1024 ? "" : "Photo size must be less 1mb"
    }

    const imageFormatCheck = (imageFromat: string) => {
        return SUPORTED_FORMATS.includes(imageFromat) ?  "" : "Wrong photo format"
    }

    function convertFile(files: FileList|null) {
        if (files) {
          const fileRef = files[0] || ""
          const fileType: string= fileRef.type || ""
          console.log("This file upload is of type:",fileType)
          console.log(fileRef.size <= 1024 * 1024)
          console.log(SUPORTED_FORMATS.includes(fileType))
          const reader = new FileReader()
          reader.readAsBinaryString(fileRef)
          reader.onload=(ev: any) => {
            // convert it to base64
            setImageSizeError(imageSizeCheck(fileRef.size))
            setImageFormatError(imageFormatCheck(fileType))
            setImage(`data:${fileType};base64,${btoa(ev.target.result)}`)
            setValue('photo', `data:${fileType};base64,${btoa(ev.target.result)}`)
            return `data:${fileType};base64,${btoa(ev.target.result)}`
          }
        }
    }

    const onSubmit = (formData: IAccauntFormValues) => {
        setValue('id', id);
        formsSet('accaunt', formData);
        dispatch(changeActiveForm('profile'));
        console.log(formData);
    }

	return (
		<>
			<div className="container">
				<div className="accaunt">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="accaunt-photo">
                                <div className='accaunt-photo-img'>
                                    <img 
                                        src={image ? image : avatar} 
                                        alt="avatar" 
                                        className={imageFormatError || imageSizeError ? 'img-error' : ''}
                                    />
                                </div>
                                <span>
                                    <input
                                        type='file'
                                        id="file"
                                        onChange={
                                            (e)=> {
                                                convertFile(e.target.files)
                                            }
                                        }
                                        
                                    />
                                    <label className='add' htmlFor="file">+ add avatar</label>
                                    {imageFormatError && <div className='error'>{imageFormatError}</div>}
                                    {imageSizeError && <div className='error'>{imageSizeError}</div>}
                                </span>
                                
                        </div>
                            <div className="accaung-form">
                                <div className='label'>
                                    <label htmlFor='userName'>
                                        User Name
                                    </label>
                                </div>
                                <input 
                                    autoComplete='on'
                                    id='userName'
                                    {...register('userName')}
                                    className={errors.userName ? 'red-border' : ''}
                                />
                                {errors && errors.userName ? <div className='error'>{errors.userName.message} </div>: null}
                                <div className='label'>
                                    <label htmlFor='password'>
                                        Password
                                    </label>
                                </div>
                                <input 
                                    id='password'
                                    {...register('password')}
                                    className={errors.password ? 'red-border' : ''}
                                />
                                {errors && errors.password ? <div className='error'>{errors.password.message} </div>: null}
                                <div className='label'>
                                    <label htmlFor='repeatPassword'>
                                        Repeat Password
                                    </label>
                                </div>
                                <input 
                                    id='repeatPassword'
                                    {...register('repeatPassword')}
                                    className={errors.repeatPassword ? 'red-border' : ''}
                                />
                                {errors && errors.repeatPassword ? <div className='error'>{errors.repeatPassword.message} </div>: null}
                            <button className='btn btn-next' type="submit">Forward</button>
                        </div>
                    </form>
				</div>
			</div>
		</>
	)
}

export default AccauntForm;
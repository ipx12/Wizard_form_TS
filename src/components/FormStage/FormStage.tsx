import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";


import './formStage.scss';
import { FormsType } from "../types/types";


const FormStage = () => {

    const formsList = ['accaunt', 'profile', 'contacts', 'capabilities'];

    const {activeForm} = useAppSelector(state => state.users)
    


    // const continuee = () => {
    //     if (nameFormInCache.length === 0 || nameFormInCache[0] === 'accaunt' || currentActiveFromName !== 'accaunt' ) {
    //         return
    //     } else {
    //         return (
    //             <div className='continue'>
    //                 <div className='continue-text'>
    //                     You have an unsaved user data. Do you want to complete it?
    //                     <span onClick={() => dispatch(changeActiveForm(nameFormInCache[0]))}>
    //                         Continue
    //                     </span>
    //                 </div>
    //                 <div 
    //                     className='continue-close'
    //                     onClick={() => setNameFormInCache([])}
    //                 >
    //                     <div></div>
    //                     <div></div>
    //                 </div>
    //             </div>
    //         )
    //     }

    // }

    const activeClass = (formName: FormsType) => {
        if (formName === activeForm) {
            return 'stage-name active'
        } else {
            return 'stage-name'
        }
    }


    return (
        <div className="container">
            <div className="stage">
                <div className={activeClass('accaunt')}>1. Accaunt</div>
                <div className={activeClass('profile')}>2. Profile</div>
                <div className={activeClass('contacts')}>3. Contacts</div>
                <div className={activeClass('capabilities')}>4. Capabilities</div>
            </div>
        </div>
    )
}

export default FormStage;
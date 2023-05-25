import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState } from "react";


import './formStage.scss';


const FormStage = () => {

    const formsList = ['accaunt', 'profile', 'contacts', 'capabilities'];

    


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


    return (
        <div className="container">
            <div className="stage">
                <div className='stage-name active'>1. Accaunt</div>
                <div className='stage-name'>2. Profile</div>
                <div className='stage-name'>3. Contacts</div>
                <div className='stage-name'>4. Capabilities</div>
            </div>
        </div>
    )
}

export default FormStage;
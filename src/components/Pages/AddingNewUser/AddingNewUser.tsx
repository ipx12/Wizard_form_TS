import AccauntForm from "../../Forms/Accaunt/Accaunt";
import ProfileForm from "../../Forms/Profile/Profile";
import ContactsFrom from "../../Forms/Contacts/Contacts";
import CapabilitiesFrom from "../../Forms/Capabilities/Capabilities";

import { useAppSelector } from "../../../store";
import { FormsType } from "../../types/types";

import Header from "../../Header/Header";
import FormStage from "../../FormStage/FormStage";



const AddingNewUser = () => {

    const fromName = useAppSelector<FormsType>(state => state.users.activeForm);

    const renderForm = () => {
        switch(fromName) {
            case 'accaunt':
                return <AccauntForm/>
            case 'profile':
                return <ProfileForm/>
            case 'contacts':
                return <ContactsFrom/>
            case 'capabilities': 
                return <CapabilitiesFrom/>
            default:
                const smth: never = fromName
                console.log('Wrong from name format')
         }
    }

    const form = renderForm();

    return (
        <>
		    <Header/>
		    <h2 className="pageName">Adding new user</h2>
            <FormStage/>
            {form}
        </>
    )
}

export default AddingNewUser;
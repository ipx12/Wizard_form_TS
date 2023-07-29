import { useParams } from "react-router-dom";

import AccauntForm from "../../Forms/Accaunt/Accaunt";
import ContactsForm from "../../Forms/Contacts/Contacts";
import ProfileForm from "../../Forms/Profile/Profile";
import FormStage from "../../FormStage/FormStage";
import Header from "../../Header/Header";
import CapabilitiesForm from "../../Forms/Capabilities/Capabilities";

const UserEdit = () => {
	const { formName } = useParams();

	const renderForm = (formName: string | undefined) => {
		switch (formName) {
			case "accaunt":
				return <AccauntForm />;
			case "profile":
				return <ProfileForm />;
			case "contacts":
				return <ContactsForm />;
			case "capabilities":
				return <CapabilitiesForm />;
			default:
				return;
		}
	};

	const form = renderForm(formName);

	return (
		<>
			<Header />
			<h2 className="pageName">Editing</h2>
			<FormStage />
			{form}
		</>
	);
};

export default UserEdit;

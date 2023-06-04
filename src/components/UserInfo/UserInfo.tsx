import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

// import { selectAll, onUserEdit } from "../pages/AddingNewUser/addingNewUserSlice";
import photo from '../../resources/img/bigphoto.png';
import edit from '../../resources/icons/Edit_dark.png';

import './userInfo.scss';
import { useAppSelector } from "../../store";
import { selectAll } from "../Pages/AddingNewUser/addingNewUserSlice";

const UserInfo = () => {
    const {userId} = useParams();
    const user = useAppSelector(selectAll).filter(user => user.id === userId)[0];

    const userSkill = (skills: typeof user.skills) => {
        return skills.map(item => item.label).join(', ')
    }
   
    return (
        <div className="container">
            <div className="info">
                <div className="back">
                    <Link to='/'>  &lt; <span>Users List</span> </Link>
                </div>
                <div className="info__photo">
                    <div className="info__photo-item">
                        <img src={user.photo && user.photo.length ? user.photo : photo} alt="img" />
                    </div>
                </div>
                <div className="info__data">

                    <div className="info__data__block">
                        <div className="info__data__block__link">
                            <div>Accaunt</div>
                            <div className="info__data__block__link-icon">
                                <Link to={`/Wizard-form/useredit/accaunt`}
                                        // onClick={() => onUserUpdate(user)}
                                        >
                                    <img src={edit} alt="edit" />
                                </Link>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="flex">
                                <div className="item">User name:</div>
                                <div className="value">{user.userName}</div>
                            </div>
                            <div className="flex">
                                <div className="item">password</div>
                                <div className="value">{'*'.repeat(user.password.length)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="info__data__block">
                        <div className="info__data__block__link">
                            <div>Personal</div>
                            <div className="info__data__block__link-icon">
                                <Link to={`/Wizard-form/useredit/profile`}
                                        // onClick={() => onUserUpdate(user)}
                                        >
                                    <img src={edit} alt="edit" />
                                </Link>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="flex">
                                <div className="item">First name:</div>
                                <div className="value">{user.firstName}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Last name:</div>
                                <div className="value">{user.lastName}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Birth date:</div>
                                <div className="value">{user.birthDay}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Email:</div>
                                <div className="value">{user.email}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Adress:</div>
                                <div className="value">{user.address}</div>
                            </div>
                        </div>
                    </div>

                    <div className="info__data__block">
                        <div className="info__data__block__link">
                            <div>Contacts</div>
                            <div className="info__data__block__link-icon">
                                <Link to={`/Wizard-form/useredit/contacts`}
                                        // onClick={() => onUserUpdate(user)}
                                        >
                                    <img src={edit} alt="edit" />
                                </Link>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="flex">
                                <div className="item">Company:</div>
                                <div className="value">{user.company}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Fax:</div>
                                <div className="value">{user.fax}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Facebook Link:</div>
                                <div className="value">{user.facebook}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Phone #1:</div>
                                <div className="value">{user.phone1}</div>
                            </div>
                            {user?.phone2 ? (
                                <div className="flex">
                                    <div className="item">Phone #2:</div>
                                    <div className="value">{user.phone2}</div>
                                </div>
                            ) : null}
                            {user?.phone3 ? (
                                <div className="flex">
                                    <div className="item">Phone #3:</div>
                                    <div className="value">{user.phone3}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="info__data__block">
                        <div className="info__data__block__link">
                            <div>Capabilities</div>
                            <div className="info__data__block__link-icon">
                                <Link to={`/Wizard-form/useredit/capabilities`}
                                        // onClick={() => onUserUpdate(user)}
                                        >
                                    <img src={edit} alt="edit" />
                                </Link>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="flex">
                                <div className="item">Skills:</div>
                                <div className="value">{userSkill(user.skills)}</div>
                            </div>
                            <div className="flex">
                                <div className="item">Hobies:</div>
                                <div className="value">{user.hobbies}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;
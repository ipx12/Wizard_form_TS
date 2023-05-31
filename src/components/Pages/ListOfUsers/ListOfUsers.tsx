import React ,{ useState, useEffect} from 'react';



import List from '../../List/UsersList';
import Header from '../../Header/Header';
import UserItem from '../../UserItem/UserItem';

import { IUser } from '../../types/types';

const ListOfUsers = () => {

	const testUser: IUser = {
		// lastUpdate: new Date(),
		userName: 'Aloha',
		password: '111',
		repeatPassword: '111',
		photo: '2',
		firstName: 'Alex',
		lastName: 'Smith',
		email: 'ada@dasd.we',
		adress: '12131231',
		gander: 'male',
		birthDay: 23123123123,
		company: 'Volvo',
		language: null,
		skills: [],
		hobbies: [],
	}

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
		setUsers([
			testUser
		])
	},[])

    return (
        <>
            <Header/>
            <h2 className="pageName">List of users</h2>
            <List 
				items={users}
				renderItem={(user: IUser) => <UserItem user={user} key={user.userName}/>}
			/>
        </>
    );
};

export default ListOfUsers;
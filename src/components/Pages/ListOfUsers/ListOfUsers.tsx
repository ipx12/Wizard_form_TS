import React ,{ useState, useEffect} from 'react';



import List from '../../List/UsersList';
import Header from '../../Header/Header';
import UserItem from '../../UserItem/UserItem';

import { IUser } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getAllUsers, selectAll } from '../AddingNewUser/addingNewUserSlice';

const ListOfUsers = () => {

	const testUser: IUser = {
		// lastUpdate: new Date(),
		id: '1',
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

    // const [users, setUsers] = useState<IUser[]>([])
	
	const dispatch = useAppDispatch()
	const users = useAppSelector(selectAll)

	console.log(users)

    useEffect(() => {
		dispatch(getAllUsers());
	},[])

    return (
        <>
            <Header/>
            <h2 className="pageName">List of users</h2>
            <List 
				items={users}
				renderItem={(user: IUser) => <UserItem user={user} key={user.id}/>}
			/>
        </>
    );
};

export default ListOfUsers;
import React ,{ useState, useEffect} from 'react';



import List from '../../List/UsersList';
import Header from '../../Header/Header';
import UserItem from '../../UserItem/UserItem';

import { IUser } from '../../types/types';

const ListOfUsers = () => {

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
		setUsers([
			{
				id: 'string',
				company: 'string',
				phone1: 'string',
				email: 'string',
			},
			{
				id: '123',
				company: 'sda',
				phone1: '1222',
				email: '@qweqwe',
			},
			{
				id: '2',
				company: 'string',
				phone1: 'string',
				email: 'string',
			},
		])
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
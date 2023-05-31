import React from 'react';

import './usersList.scss'

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode
}

export default function List<T> (props: ListProps<T>) {

    return (
        <>
            <div className="container">
                <div className="table">
                    <div className='table-head'>
                        <div className="table-name">name</div>
                        <div className="table-company">company</div>
                        <div className="table-contacts">contacts</div>
                        <div className="table-update">last update</div>
                    </div>
                    <div className="users">
                        {props.items.length ? 
                            props.items.map(props.renderItem) 
                            : 
                            <div className="table__nouser">
                                <div className="table__nouser-title">No users here :(</div>
                                {/* <Link to="/Wizard-form/useradd"> */}
                                    <div className="table-create">Create new user</div>
                                {/* </Link> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
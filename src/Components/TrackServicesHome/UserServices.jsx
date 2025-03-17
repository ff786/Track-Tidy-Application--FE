import React from 'react'
import ServiceInput from './UserServiceInput.jsx'
import UserList from '../UserManagement/UserList.jsx';


const UserServices = () => {

    return(
        <div>
            <ServiceInput /> 
            <UserList/>
            
        </div>

    );

}

export default UserServices;
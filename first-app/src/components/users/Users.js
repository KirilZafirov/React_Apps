import React , { useContext , useEffect} from 'react'
import UserItem from './UserItem';
import Spinner from'../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => { 
    const githubContext = useContext(GithubContext); 
    const {users , loading , initialUsers} = githubContext;
    
    useEffect(() => {
        initialUsers();
        //eslint-disable-next-line
    }, []);

    

 

        if(loading) {
            return <Spinner />
        } else {
            return (
                <div style={userStyle}>
                    {
                    users?.map( u =>   
                        <UserItem key={u.id} user={u}/>
                    )}
                </div>
            );
        } 
} 

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3 , 1fr)',
    gridGap: '1rem'
}

export default Users

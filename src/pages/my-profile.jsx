import withAuth from '../hocs/withAuth.jsx';
import styled from '@emotion/styled';
import React from 'react';
import firebase from '../firebase';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > h1 {
    margin: 1rem;
  }
`;

function MyProfile() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const result = firebase.getCurrentUser();
    setUser(result);
    console.log(result);
  }, []);

  return (
    <ProfileContainer>
      {user && (
        <img
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,.25)'
          }}
          src={user.photoURL}
          alt={user.displayName}
        />
      )}
      <h1>{user && user.displayName}</h1>
    </ProfileContainer>
  );
}

export default withAuth(MyProfile);

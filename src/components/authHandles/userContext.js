import React from 'react';
import { createContext } from 'react';

const UserContext = React.createContext({
    user: null,
    setUser: () => {}
});

export default UserContext;
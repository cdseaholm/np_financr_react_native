
import { EXPO_PUBLIC_ACCOUNT_IP_URL } from '@env';
import fetch from 'node-fetch';

export async function handleUpdate(email) { 
    const new_last_login = new Date(); 
    const new_updatedAt = new Date();
    const new_session_expires = new Date(Date.now() + 24*60*60*1000);
    const updateResponse = await fetch(`${EXPO_PUBLIC_ACCOUNT_IP_URL}/update/account/${email}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email,
            last_login: new_last_login,
            updatedAt: new_updatedAt,
            session_expires: new_session_expires
        })
      });
      if (!updateResponse.ok) {
        return false;
      }
      console.log(email);
      return true;

}


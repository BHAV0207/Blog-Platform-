import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Store/UserContext';

function HomePage() {

  const {user , getUser} = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      home
    </div>
  )
}

export default HomePage
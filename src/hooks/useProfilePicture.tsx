import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom';
import { auth, getProfilePic } from '../config/firebase';
import { User } from '../interfaces/firebase';

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface UseProfilePicProps {
  profilePic: string
}

const useProfilePic = ({ setLoading }: Props): UseProfilePicProps => {
  const location = useLocation();
  const [profilePic, setProfilePic] = useState<string>('')

  async function getPic(currentUser: User | null): Promise<void> {
    const imageRes = await getProfilePic(currentUser, setLoading);
    if (imageRes !== null) {
      setProfilePic(imageRes);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth.currentUser) {
      getPic(auth.currentUser);
    }
  }, [setLoading]);

  useEffect(() => {
    if (auth.currentUser) {
      getPic(auth.currentUser);
    }
  }, [location.pathname]);

  return { profilePic };
}

export default useProfilePic;

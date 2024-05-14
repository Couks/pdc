import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchProfile(profileId: string) {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`API_URL`);
    };
  });
}

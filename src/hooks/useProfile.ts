import { API_URL } from "@/hooks/auth/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  DDDtelefone?: string;
  apelido?: string;
  firstName?: string;
  lastName?: string;
}

export async function useProfile() {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/eu`);
        console.log(response.data);
        if (response) {
          const data = await response.data;
          setUserData(data._j);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData]);

  return userData;
}

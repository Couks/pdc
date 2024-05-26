import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/hooks/auth/AuthContext";

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

export function useProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${API_URL}/users/eu`);
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  return userData;
}

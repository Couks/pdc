import axios from "axios";
import { useState, useEffect, useCallback } from "react";
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

interface UseProfileResult {
  isLoading: boolean;
  error: Error | null;
  userData: UserData | null;
  refetch: () => void;
}

export const useProfile = (): UseProfileResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<UserData>(`${API_URL}/users/eu`);
      setUserData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const refetch = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { isLoading, error, userData, refetch };
};

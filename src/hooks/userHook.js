import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function useUserAuth() {
  const userStorage = useSelector((state) => state.user);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          method: "get",
          url: process.env.REACT_APP_DOMAIN + "/user",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userStorage.token}`,
          },
        });
        if (response) {
          setUser({ ...response.data, token: userStorage.token });
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    if (userStorage) {
      getUser();
    } else {
      setUser(null);
    }
  }, [userStorage]);

  return { user, setUser };
}

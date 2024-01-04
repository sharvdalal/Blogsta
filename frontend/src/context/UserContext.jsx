import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);



    const getUser = async()=>{
            try {
                const res = await axios.get(URL+"/api/auth/refetch", {withCredentials: true})
                // console.log(res.data);
                setUser(res.data)
                
            } catch (error) {
                console.log(error);
                
            }
    }


    useEffect(() => {
        getUser(    )
    }, [])


    return(<UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>)
}
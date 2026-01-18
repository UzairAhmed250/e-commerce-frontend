// import { createContext, useContext, useState, useEffect} from 'react';

// const AuthCOntext = createContext(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState(null); 
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/user')
//                 const data = await response.json();
//                 console.log(data);
//                 // setUser(data.user);

//             } catch (error) {
//                 console.error("Error fetching user data", error);
//             }
//         }
//     },[])
        
    
// }
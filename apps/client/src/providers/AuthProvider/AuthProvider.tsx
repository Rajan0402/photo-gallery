import { useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { axiosApi } from "@/config/axiosConfig";
import { refreshEndpoint } from "./AuthProvider.constants";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const refreshAccessToken = async () => {
    try {
      // ***** Implementation Pending ***** //
      const accessToken = await axiosApi.post(refreshEndpoint);

      console.log("accessToken---", accessToken);
    } catch (error) {}
  };

  // refresh access token on app load, this will run for first time when app loads
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider= ({ children }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   // Function to refresh access token
//   const refreshAccessToken = async () => {
//     try {
//       const response = await fetch("/api/refresh-token", {
//         method: "POST",
//         credentials: "include", // Send HTTP-only cookies
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAccessToken(data.accessToken); // Store in state (memory)
//       } else {
//         setAccessToken(null); // Reset token on failure
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       setAccessToken(null);
//     }
//   };

//   // Automatically refresh token on app load
//   useEffect(() => {
//     refreshAccessToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken, refreshAccessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

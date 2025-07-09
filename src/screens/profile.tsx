// import { useState, useEffect } from "react";

// // Define the Profile interface based on API response
// interface Profile {
//   id: string;
//   full_name: string;
//   user_name: string;
//   email: string;
//   password: string;
//   avatar: string | null;
//   is_deleted: boolean;
//   is_active: boolean;
//   roles: string[];
//   created_at: string;
//   updated_at: string;
// }

// // Define the API response interface
// interface ApiResponse {
//   message: string;
//   data: Profile;
// }

// const Profile = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/v1/user/me", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result: ApiResponse = await response.json();
//         console.log("API Response:", result);

//         if (result.message === "get profile successfully") {
//           setProfile(result.data);
//         } else {
//           setError(
//             `Unexpected response: ${result.message || "No message provided"}`
//           );
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         if (err instanceof Error) {
//           setError(`Failed to load profile data: ${err.message}`);
//         } else {
//           setError("An unknown error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex justify-center items-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-semibold">Loading Profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-red-600 mb-4">{error}</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex justify-center items-center p-4 sm:p-6">
//       <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
//         <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
//           <h1 className="text-3xl font-bold text-center">Admin Profile</h1>
//         </div>
//         <div className="p-8">
//           <div className="flex justify-center mb-6">
//             <img
//               src={
//                 profile?.avatar ||
//                 "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
//               }
//               alt="Profile Avatar"
//               className="w-24 h-24 rounded-full border-4 border-white shadow-md"
//             />
//           </div>
//           <div className="space-y-5">
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">
//                 Full Name:
//               </span>
//               <span className="text-gray-900">{profile?.full_name}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">
//                 Username:
//               </span>
//               <span className="text-gray-900">{profile?.user_name}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">Email:</span>
//               <span className="text-gray-900">{profile?.email}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">Roles:</span>
//               <span className="text-gray-900">{profile?.roles.join(", ")}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">Status:</span>
//               <span
//                 className={`text-gray-900 ${
//                   profile?.is_active ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {profile?.is_active ? "Active" : "Inactive"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">
//                 Created:
//               </span>
//               <span className="text-gray-900">
//                 {profile?.created_at
//                   ? new Date(profile.created_at).toLocaleDateString()
//                   : "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-gray-700 w-1/3">
//                 Updated:
//               </span>
//               <span className="text-gray-900">
//                 {profile?.updated_at
//                   ? new Date(profile.updated_at).toLocaleDateString()
//                   : "N/A"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useState, useEffect } from "react";

// interface Profile {
//   full_name: string;
//   user_name: string;
//   email: string;
//   avatar: string | null;
//   is_active: boolean;
//   roles: string[];
//   gender: string;
//   dob: string;
//   address: string;
//   phone: string;
//   nationality: string;
// }

// const Profile = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/v1/my-card/list",
//           {
//             method: "GET",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(
//             response.status == 401
//               ? "Please log in"
//               : `Error: ${response.status}`
//           );
//         }

//         const { cards } = await response.json();
//         if (cards?.length) {
//           const { user, ...card } = cards[0];
//           setProfile({ ...user, ...card });
//         } else {
//           setError("No data found");
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-semibold">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center">
//         <p>error</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
//         <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
//           <h1 className="text-3xl font-bold text-center">Admin Profile</h1>
//         </div>
//         <div className="p-8 space-y-5">
//           <img
//             src={
//               profile?.avatar ||
//               "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
//             }
//             alt="Avatar"
//             className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto"
//           />
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Name:</span>
//             <span>{profile?.full_name || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Username:</span>
//             <span>{profile?.user_name || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Email:</span>
//             <span>{profile?.email || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Roles:</span>
//             <span>{profile?.roles.join(", ") || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Status:</span>
//             <span
//               className={profile?.is_active ? "text-green-600" : "text-red-600"}
//             >
//               {profile?.is_active ? "Active" : "Inactive"}
//             </span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Gender:</span>
//             <span>{profile?.gender || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">
//               Birth Date:
//             </span>
//             <span>
//               {profile?.dob
//                 ? new Date(profile.dob).toLocaleDateString()
//                 : "N/A"}
//             </span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Address:</span>
//             <span>{profile?.address || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">Phone:</span>
//             <span>{profile?.phone || "N/A"}</span>
//           </div>
//           <div className="flex gap-3">
//             <span className="font-semibold text-gray-700 w-1/3">
//               Nationality:
//             </span>
//             <span>{profile?.nationality || "N/A"}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useQuery } from "@tanstack/react-query";
import { requestProfile } from "@/lib/api/profile-api";

// Interfaces
interface Profile {
  id: string;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string | null;
  is_deleted: boolean;
  is_active: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  message: string;
  data: Profile;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string | null;
  is_deleted: boolean;
  is_active: boolean;
  roles: string;
  created_at: string;
  updated_at: string;
  
}

const Profile = () => {
  const { PROFILE } = requestProfile();

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await PROFILE();
      return response.data;
    },
  });
console.log("API raw data:", data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error instanceof Error) {
    return <p className="text-red-600 mb-4">Failed to load: {error.message}</p>;
  }

  const profile = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Admin Profile</h1>
        </div>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img
              src={
                profile?.avatar ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
              }
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Full Name:</span>
              <span className="text-gray-900">{profile?.full_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Username:</span>
              <span className="text-gray-900">{profile?.user_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Email:</span>
              <span className="text-gray-900">{profile?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Roles:</span>
              <span className="text-gray-900">{profile?.roles}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Status:</span>
              <span
                className={`${
                  profile?.is_active ? "text-green-600" : "text-red-600"
                }`}
              >
                {profile?.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Created:</span>
              <span className="text-gray-900">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-1/3">Updated:</span>
              <span className="text-gray-900">
                {profile?.updated_at
                  ? new Date(profile.updated_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

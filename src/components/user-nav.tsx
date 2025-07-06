import { useState, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  full_name: string;
  email: string;
  avatar: string | null;
}

interface Card {
  user: UserData;
}

interface ApiResponse {
  message: string;
  cards: Card[];
}

export function UserNav() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/my-card/list",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized: Please log in");
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        console.log("UserNav API Response:", JSON.stringify(result, null, 2));

        if (result.cards && result.cards.length > 0) {
          setUserData(result.cards[0].user);
        } else {
          setError("No user data found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Generate fallback initials from full_name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
              }
              alt="User"
            />
            <AvatarFallback>
              {userData ? getInitials(userData.full_name) : "G"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left text-sm">
            <span className="font-medium">
              {userData?.full_name || "Guest"}
            </span>
            <span className="text-xs text-muted-foreground">
              {userData?.email || "N/A"}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.full_name || "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {error || userData?.email || "N/A"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

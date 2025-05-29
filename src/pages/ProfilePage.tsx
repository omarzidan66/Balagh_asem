// src/pages/ProfilePage.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {user.username ? `${user.username}'s Profile` : "User Profile"}
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
          />
        </div>
        {user.username && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
            />
          </div>
        )}
        {user.role === 'government' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={user.department}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
            />
          </div>
        )}
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
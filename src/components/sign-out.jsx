import { signOut } from "next-auth/react";

function SIGNOUT() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="flex justify-center">
      <button
        className="bg-red-700 p-2 rounded-lg cursor-pointer"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SIGNOUT;

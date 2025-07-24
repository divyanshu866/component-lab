import { signOut } from "next-auth/react";

function SIGNOUT() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="flex justify-center">
      <button
        className="bg-red-700 px-2 py-1 rounded-sm cursor-pointer"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SIGNOUT;

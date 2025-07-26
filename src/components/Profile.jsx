"use client";
import { Download, Heart, LogOut, Settings, User } from "lucide-react";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
const Profile = ({ user }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  return (
    <div className="h-full aspect-square mr-1">
      <button
        onClick={() => setShowProfileModal(true)}
        className="border dark:border-white rounded-full cursor-pointer"
      >
        <img
          src={user.image}
          alt=""
          className="rounded-full contain-content h-full w-full bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-border border-3 border-transparent"
        />
      </button>
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-md mx-4 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full flex items-center justify-center">
                  <img
                    src={user.image}
                    className="h-full aspect-square rounded-full"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {user.name}
                  </h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {/* <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-300">Components Created</span>
                  <span className="text-white font-semibold">127</span>
                </div> */}
                {/* <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-300">Libraries</span>
                  <span className="text-white font-semibold">8</span>
                </div> */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-300">Plan</span>
                  <span className="text-purple-400 font-semibold">Free</span>
                </div>
              </div>

              {/* <div className="space-y-2 mb-6">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors text-left">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors text-left">
                  <Heart className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Liked Components</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors text-left">
                  <Download className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Export Library</span>
                </button>
              </div> */}

              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={signOut}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-red-500/10 rounded-lg transition-colors text-left text-red-400 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

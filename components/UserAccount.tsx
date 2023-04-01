"use client";

import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function UserAccount() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="col-span-full">
        <LoginButton />
      </div>
    );
  }
  return (
    <>
      <div className="col-span-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="avatar">
            <div className="relative w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                unoptimized
                src={user.photoURL}
                alt="user's avatar"
                layout="fill"
              />
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">{user.displayName}</div>
            <div className="text-secondary">{user.email}</div>
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <ul className="p-2 menu menu-compact bg-base-100 rounded-box shadow w-full">
          <li className="menu-title">
            <span>Bài hát</span>
          </li>
          <li>
            <a>
              <HeartIcon className="text-current w-5 h-5" /> Yêu thích
            </a>
          </li>
          <li>
            <a>
              <ClockIcon className="text-current w-5 h-5" /> Đã phát gần đây
            </a>
          </li>
          <li className="menu-title">
            <span>Playlist</span>
          </li>
          <li>
            <a>
              <span className="badge">1</span> Mới
            </a>
          </li>
          <li>
            <a>
              <span className="badge">12</span> Nhạc miền tây
            </a>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </>
  );
}

function LoginButton() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="col-span-full">
      <button
        className={`btn btn-primary btn-sm ${loading ? "loading" : ""}`}
        onClick={() => signInWithGoogle()}
      >
        Đăng nhập với Google
      </button>
    </div>
  );
}

function SignOutButton() {
  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <a
      className={`btn btn-ghost text-error ${loading ? "loading" : ""}`}
      onClick={() => signOut()}
    >
      Đăng Xuất
    </a>
  );
}

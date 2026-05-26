import { auth, signOut } from "@/auth";
import Link from "next/link";

const Nav = async () => {
  const session = await auth();
  const userRole = session?.user?.role;
  const isLoggedIn = !!session;

  return (
    <nav className="shrink-0 h-20 w-full text-white bg-gray-800 p-4 flex items-center gap-6 justify-between ">
      {" "}
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        {isLoggedIn && (
          <Link href="/user" className="hover:underline">
            User
          </Link>
        )}
        {userRole === "ADMIN" && (
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        )}
      </div>
      {session?.user && (
        <>
          <span className="font-bold text-right text-amber-200">
            {" "}
            Welcome, {session?.user?.name}
          </span>
        </>
      )}
      {!session?.user ? (
        <Link href="/signin">Sign In</Link>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            className=" hover:underline 
            hover:text-amber-700 transition cursor-pointer "
            type="submit"
          >
            SignOut
          </button>
        </form>
      )}
    </nav>
  );
};

export default Nav;

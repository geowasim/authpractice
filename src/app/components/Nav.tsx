import Link from "next/link";

const Nav = () => {
  return (
    <nav className="shrink-0 h-20 w-full text-white bg-gray-800 p-4 flex items-center gap-6">
      {" "}
      <Link href="/" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/products" className="hover:underline">
        Products
      </Link>
      <Link href="/user" className="hover:underline">
        User
      </Link>
      <Link href="/admin" className="hover:underline">
        Admin
      </Link>
    </nav>
  );
};

export default Nav;

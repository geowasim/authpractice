import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  const roleSession = session?.user.role;
  if (roleSession !== "ADMIN") {
    redirect("/");
  }
  return <div>Admin Page</div>;
};

export default Page;

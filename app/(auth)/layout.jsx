import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }) => {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div>
      <nav className="mb-3">
        <div className="flex items-center h-16 p-5 justify-center max-w-7xl mx-auto border-b ">
          <Link
            href="/"
            className="text-xl font-bold text-muted-foreground transition-colors hover:text-blue-500"
          >
            Home
          </Link>
        </div>
      </nav>
      <div className="flex justify-center items-center h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;

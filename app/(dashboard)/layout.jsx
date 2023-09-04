import Navbar from "@/components/navbar";
import SideBar from "@/components/side-bar";
import { getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative ">
      <div className="hidden md:flex md:w-72 bg-gray-900 md:fixed md:inset-y-0 md:flex-col ">
        <SideBar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

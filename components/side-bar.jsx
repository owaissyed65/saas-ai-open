"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
const montSerrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
const SideBar = () => {
  const pathName = usePathname();
  const routes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      href: "/conversation",
      icon: MessageSquare,
      color: "text-violet-500",
    },
    {
      label: "Image Generation",
      href: "/image",
      icon: ImageIcon,
      color: "text-pink-500",
    },
    {
      label: "Music Generation",
      href: "/music",
      icon: Music,
      color: "text-red-500",
    },
    {
      label: "Video Generation",
      href: "/video",
      icon: VideoIcon,
      color: "text-orange-500",
    },
    {
      label: "Code",
      href: "/code",
      icon: Code,
      color: "text-emerald-500",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      color: "text-white-500",
    },
  ];
  return (
    <div className="flex text-white space-y-4 flex-col py-4 bg-[#111827] h-full">
      <div className="px-3 py-2 ">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 rounded-full">
            <Image fill src="/logo.png" alt="logo" />
          </div>
          <h1
            className={cn(
              "text-2xl font-bold cursor-pointer",
              montSerrat.className
            )}
          >
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all w-full",
                pathName === route.href ? "text-white bg-white/10" : "text-zinc-500"
              )}
            >
              <div className="flex items-center gap-3">
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}{" "}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

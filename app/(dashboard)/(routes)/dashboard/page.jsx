"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Converstion",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Code",
    href: "/code",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-white-500",
    bgColor: "bg-white-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-3.5 mb-8">
        <h1 className="text-2xl text-center md:text-4xl font-bold">
          Explore the power of AI
        </h1>
        <p className="text-center text-sm text-muted-foreground md:text-lg font-light">
          Chat with the smartest AI - Experience the power of AI{" "}
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 flex items-center justify-between border-black/5 hover:shadow-md transition cursor-pointer"
            onClick={()=>router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit p-2 rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-6 h-6 " />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

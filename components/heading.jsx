import { cn } from "@/lib/utils";

const Heading = ({ title, description, color, bgColor, Icon }) => {
  return (
    <div className="px-4 flex items-center gap-x-4 mb-8">
      <div className={cn("flex items-center w-fit p-2 rounded-md", bgColor)}>
        <Icon className={cn("w-8 h-8", color)} />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constant";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const FreeCounter = ({ apiLimitCount }) => {
  const modal = useProModal();
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-4">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount}/{MAX_FREE_COUNT} Free Generations
            </p>
            <Progress value={(apiLimitCount / MAX_FREE_COUNT) * 100} />
          </div>
          <Button
            className="w-full"
            variant="premium"
            onClick={() =>{modal.onOpen()}}
          >
            Upgrade to Genius
            <Zap className="h-4 w-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;

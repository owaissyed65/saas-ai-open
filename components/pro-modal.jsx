"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";

const ProModal = () => {
  const modal = useProModal();
  const onChange = (open) => {
    if (!open) {
      modal.onClose();
    }
  };
  return (
    <Dialog
      open={modal.isOpen}
      onOpenChange={onChange}
      
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 text-black">
            <div className="flex items-center gap-x-2 font-bold py-1">
            Upgrade to Genius
            <Badge variant={"premium"} className={"uppercase text-sm py-1"}>Pro</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

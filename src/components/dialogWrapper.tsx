// DialogWrapper.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[80vh]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto max-h-[500px] ">{children}</div>
    </DialogContent>
  </Dialog>
);

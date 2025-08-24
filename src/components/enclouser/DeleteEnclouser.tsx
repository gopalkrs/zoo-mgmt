"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios"; 

// ----------------- Types -----------------
interface DeleteEnclosureProps {
  id: string;
  enclosureName?: string;
  onDeleteSuccess?: () => void;
  onDeleteError?: (error: Error) => void;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
  deletedId: string;
}

// ----------------- API -----------------
const deleteEnclosure = async (id: string): Promise<DeleteResponse> => {
  const response = await axios.delete(`/api/enclosures/${id}`);
  return response.data;
};

// ----------------- Component -----------------
export const DeleteEnclosure: React.FC<DeleteEnclosureProps> = ({
  id,
  enclosureName,
  onDeleteSuccess,
  onDeleteError,
  disabled = false,
  variant = "destructive",
  size = "sm",
  className = "",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<DeleteResponse, Error, string>({
    mutationFn: deleteEnclosure,
    onSuccess: (data) => {
      // Optimistic update
      queryClient.setQueryData(["enclosures"], (oldData: unknown) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          enclosures: oldData.enclosures.filter((enc: any) => enc._id !== id),
          total: oldData.total - 1,
        };
      });

      queryClient.invalidateQueries({ queryKey: ["enclosures"] });

      toast.success(data.message || "Enclosure deleted successfully", {
        description: enclosureName ? `Deleted "${enclosureName}"` : undefined,
      });

      setIsDialogOpen(false);
      onDeleteSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete enclosure");
      onDeleteError?.(error);
    },
  });

  const handleDelete = () => {
    if (!id) {
      console.error("Enclosure ID is required for deletion");
      return;
    }
    deleteMutation.mutate(id);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`cursor-pointer ${className}`}
          disabled={disabled || deleteMutation.isPending}
        >
          {deleteMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {size !== "icon" && (
            <span className="ml-2">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Enclosure
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            enclosure
            {enclosureName && (
              <span className="font-medium"> {enclosureName}</span>
            )}
            and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        {/* Error alert */}
        {deleteMutation.isError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {deleteMutation.error?.message ||
                "An error occurred while deleting the enclosure"}
            </AlertDescription>
          </Alert>
        )}

        {/* Warning box */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm">
              <h4 className="font-medium text-red-800 mb-1">Warning</h4>
              <ul className="text-red-700 space-y-1">
                <li>• All animals in this enclosure will need to be relocated</li>
                <li>• Historical data and records will be permanently lost</li>
                <li>• This action cannot be reversed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Permanently
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

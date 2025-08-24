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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

// ----------------- Types -----------------
interface EditEnclosureProps {
  id: string;
  initialName?: string;
  initialStatus?: "active" | "under maintenance" | "closed";
  onEditSuccess?: () => void;
  onEditError?: (error: Error) => void;
  disabled?: boolean;
}

interface EditResponse {
  success: boolean;
  message: string;
  updatedId: string;
  updatedData: any;
}

interface FormValues {
  name: string;
  status: "active" | "under maintenance" | "closed";
}

// ----------------- API -----------------
const updateEnclosure = async ({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: string;
}): Promise<EditResponse> => {
  const response = await axios.put(`/api/enclosures/${id}`, { name, status });
  return response.data;
};

// ----------------- Component -----------------
export const EditEnclosure: React.FC<EditEnclosureProps> = ({
  id,
  initialName = "",
  initialStatus = "active",
  onEditSuccess,
  onEditError,
  disabled = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: initialName,
      status: initialStatus,
    },
  });

  const editMutation = useMutation<
    EditResponse,
    Error,
    { id: string; name: string; status: string }
  >({
    mutationFn: updateEnclosure,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["enclosures"] });

      toast.success(data.message || "Enclosure updated successfully", {
        description: `Name: "${variables.name}", Status: "${variables.status}"`,
      });

      setIsDialogOpen(false);
      onEditSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update enclosure");
      onEditError?.(error);
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.name.trim()) {
      toast.warning("Enclosure name cannot be empty");
      return;
    }
    editMutation.mutate({ id, ...data });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (open) {
          reset({ name: initialName, status: initialStatus }); // reset on open
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || editMutation.isPending}
        >
          {editMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
          <span className="ml-2">Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Enclosure</DialogTitle>
            <DialogDescription>
              Update the details of this enclosure. Changes will be saved
              immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 col-span-4 ml-[25%]">
                {errors.name.message}
              </p>
            )}

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="under maintenance">
                        Under Maintenance
                      </SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={editMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={editMutation.isPending}>
              {editMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

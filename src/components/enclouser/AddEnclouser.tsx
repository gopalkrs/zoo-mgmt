"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  name: string;
  category: string;
  status: "active" | "inactive" | "under maintenance" | "closed";
  maxCapacity: number;
  lastCleaned?: string;
}

export function AddEnslouser() {
  const [open, setOpen] = useState(false);

  const categories = [
    "aquatic",
    "forrest",
    "land",
    "desert",
    "aviary",
    "savannah",
    "reptile house",
    "insectarium",
  ];

  const statusOptions: FormData["status"][] = [
    "active",
    "under maintenance",
    "closed",
    "inactive",
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      category: "",
      status: "active",
      maxCapacity: 0,
      lastCleaned: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["createEnclosure"],
    mutationFn: async (data: FormData) => {
      await axios.post("/api/enclosures", data);
    },
    onSuccess: () => {
      reset(); // clear form after submit
      setOpen(false);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 cursor-pointer" variant="default">
            Create
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Enclosure</DialogTitle>
          </DialogHeader>

          {/* ✅ Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter enclosure name"
                {...register("name", { required: "Name is required" })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Max Capacity */}
            <div className="space-y-2">
              <Label htmlFor="maxCapacity">Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                placeholder="Enter maximum capacity"
                {...register("maxCapacity", {
                  required: "Max capacity is required",
                  min: {
                    value: 1,
                    message: "Must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                className={errors.maxCapacity ? "border-red-500" : ""}
              />
              {errors.maxCapacity && (
                <p className="text-sm text-red-500">
                  {errors.maxCapacity.message}
                </p>
              )}
            </div>

            {/* Last Cleaned */}
            <div className="space-y-2">
              <Label htmlFor="lastCleaned">Last Cleaned (Optional)</Label>
              <Input
                id="lastCleaned"
                type="date"
                {...register("lastCleaned")}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Enclosure</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

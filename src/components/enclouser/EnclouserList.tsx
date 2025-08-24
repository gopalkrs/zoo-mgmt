"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { DeleteEnclosure } from "./DeleteEnclouser";
import { EditEnclosure } from "./EditEnclouser";

interface Enclosure {
  _id: string;
  name: string;
  category:
    | "aquatic"
    | "forrest"
    | "land"
    | "desert"
    | "aviary"
    | "savannah"
    | "reptile house"
    | "insectarium";
  status: "active" | "under maintenance" | "closed";
  maxCapacity: number;
  lastCleaned?: Date;
  animals: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface EnclosuresResponse {
  success: boolean;
  result: Enclosure[];
}

export const fetchEnclosures = async (): Promise<EnclosuresResponse> => {
  const { data } = await axios.get<EnclosuresResponse>("/api/enclosures");
  return {
    enclosures: data.result,
    total: data.result.length,
  };
};

const EnclosureCard: React.FC<{ enclosure: Enclosure }> = ({ enclosure }) => {
  const getStatusColor = (status: Enclosure["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "under maintenance":
        return "bg-yellow-500";
      case "closed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: Enclosure["category"]) => {
    return <MapPin className="h-4 w-4" />;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString();
  };

  const handleDeleteSuccess = () => {
    console.log("Enclosure deleted successfully!");
  };

  const handleDeleteError = (error: Error) => {
    console.error("Failed to delete enclosure:", error);
  };

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {enclosure.name}
          </CardTitle>
          <Badge className={`${getStatusColor(enclosure.status)} text-white`}>
            {enclosure.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          {getCategoryIcon(enclosure.category)}
          <span className="capitalize">{enclosure.category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Capacity: {enclosure.animals.length}/{enclosure.maxCapacity}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Last cleaned: {formatDate(enclosure.lastCleaned)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3">
            <span className="text-sm text-gray-500">
              {enclosure.animals.length} animals
            </span>
            <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <EditEnclosure
                id={enclosure._id}
                initialName={enclosure.name}
                initialStatus={enclosure.status}
              />
              <DeleteEnclosure
                id={enclosure._id}
                enclosureName={enclosure.name}
                onDeleteSuccess={handleDeleteSuccess}
                onDeleteError={handleDeleteError}
                variant="destructive"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EnclosureCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-24" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-3">
          <Skeleton className="h-4 w-20" />
          <div className="space-x-2">
            <Skeleton className="h-8 w-20 inline-block" />
            <Skeleton className="h-8 w-16 inline-block" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const EnclosureList: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    EnclosuresResponse,
    Error
  >({
    queryKey: ["enclosures"],
    queryFn: fetchEnclosures,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <EnclosureCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading enclosures:{" "}
            {error?.message || "Unknown error occurred"}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const enclosures = data?.enclosures || [];
  const total = data?.total || 0;

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Enclosures</h1>
          <p className="text-gray-600 mt-1">
            Manage your zoo enclosures ({total} total)
          </p>
        </div>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>

      {enclosures.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No enclosures found
          </h3>
          <p className="text-gray-600">
            Get started by creating your first enclosure.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enclosures.map((enclosure) => (
            <EnclosureCard key={enclosure._id} enclosure={enclosure} />
          ))}
        </div>
      )}
    </div>
  );
};

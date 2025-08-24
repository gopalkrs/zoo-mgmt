"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddAnimal } from "@/queries/create-animal-api";
// import { Product } from '@/constants/mock-api';
import { useForm } from "react-hook-form";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// export const formSchema = z.object({
//   photo_url: z
//     .any()
//     .refine((files) => files?.length == 1, "Image is required.")
//     .refine(
//       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//       `Max file size is 5MB.`
//     )
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       ".jpg, .jpeg, .png and .webp files are accepted."
//     ),
//   name: z.string().min(2, {
//     message: "Product name must be at least 2 characters.",
//   }),
//   category: z.string(),
//   dob: z.date(),
//   gender: z.string(),
//   origin: z.string().min(2, { message: "Origin must be at least 2 characters"})
// });

export default function ProductForm() {
  const { mutate: addAnimal } = useAddAnimal();

  interface ANIMAL_TYPE {
    _id?: string;
    photo_url: string;
    name: string;
    dob: Date;
    gender: string;
    category: string;
    origin: string;
  }

  const form = useForm({
    // resolver: zodResolver(login),
    defaultValues: {
      photo_url: "https://abc.com",
      name: "",
      dob: new Date(),
      gender: "",
      category: "",
      origin: "",
    },
  });

  function onSubmit(values: ANIMAL_TYPE) {
    // Form submission logic would be implemented here
    addAnimal(values, {
      onSuccess: (data) => {
        console.log("Animal added successfully", data);
        form.reset();
      },
    });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Add New Animal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <FormField
              control={form.control}
              name="photo_url"
              render={({ field }: { field: any }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                        // disabled={loading}
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            /> */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Zebra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DOB</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aquatic">Aquatic</SelectItem>
                        <SelectItem value="forrest">Forrest</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="desert">Desert</SelectItem>
                        <SelectItem value="aviary">Aviary</SelectItem>
                        <SelectItem value="savannah">Savannah</SelectItem>
                        <SelectItem value="reptile house">
                          Reptile House
                        </SelectItem>
                        <SelectItem value="insectarium">Insectarium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Norway.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="bg-green-500 text-gray-100 hover:bg-orange-600"
              type="submit"
            >
              Add Animal
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

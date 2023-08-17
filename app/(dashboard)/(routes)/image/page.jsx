"use client";

import { Download, ImageIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Heading from "@/components/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { amountOption, resolutionOption } from "./constant";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);
      const urls = response.data?.map((image) => image?.url);
      setImages(urls);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }
  return (
    <div className="max-w-72 mx-auto">
      <Heading
        title={"Image Generation"}
        description={"Convert your text into prompt"}
        color={"text-pink-500"}
        bgColor={"bg-pink-500/10"}
        Icon={ImageIcon}
      />
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full rounded-lg border p-4 px-1 md:px-1 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6 ">
                    <Input
                      {...field}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent outline-none focus-visible:outline-none focus-visible:border-none placeholder:text-muted-foreground placeholder:italic "
                      placeholder="A picture of dog is under bed..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-start-7 lg:col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOption.map((amount) => (
                          <SelectItem value={amount.value} key={amount.value}>
                            {amount.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-start-9 lg:col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOption.map((resolution) => (
                          <SelectItem
                            value={resolution.value}
                            key={resolution.value}
                          >
                            {resolution.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-start-11 lg:col-span-2 disabled:bg-black/20 "
                type="submit"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div>
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images?.length === 0 && !isLoading && (
            <Empty label={"No any images generated"} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images?.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image alt="Chat" fill src={src} className="object-fill"/>
                </div>
                <CardFooter className="p-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(src)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;

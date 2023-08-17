"use client";

import { Music } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Heading from "@/components/heading";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
});

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
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
        title={"Music"}
        description={"Turn your prompt into music"}
        color={"text-red-500"}
        bgColor={"bg-red-500/10"}
        Icon={Music}
      />
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <Input
                      {...field}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent outline-none focus-visible:outline-none focus-visible:border-none placeholder:text-muted-foreground placeholder:italic "
                      placeholder="A violin..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 disabled:bg-black/20"
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
            <div className="p-8 bg-muted rounded-lg w-full flex justify-center items-center">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label={"No music generated yet.."} />}
          {music && (
            <audio className="w-full mt-8" controls>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

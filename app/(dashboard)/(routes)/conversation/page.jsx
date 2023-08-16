"use client";

import { MessageSquare } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { BotAvatar, UserAvatar } from "@/components/user-bot-avatar";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
});

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setmessages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setmessages((current) => [...current, userMessage, response.data]);

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
        title={"Conversation"}
        description={"Our most advanced conversation modal"}
        color={"text-violet-500"}
        bgColor={"bg-violet-500/10"}
        Icon={MessageSquare}
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
                      placeholder="Type a prompt here..."
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
          {messages?.length === 0 && !isLoading && (
            <Empty label={"No conversation started yet.."} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages?.map((message) => (
              <div
                key={message?.content}
                className={cn(
                  "p-8 flex items-start gap-x-8 rounded-lg",
                  message?.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message?.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

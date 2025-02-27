import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/server';
import { formatDateTime } from "@/lib/utils";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select().order('createdAt', { ascending: false });
  if (!data) {}

  return (
    <>
      <main>
        <h1 className="text-center text-4xl mb-3">Messages</h1>

        <section className="max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!data ? 
            (<h3>Nothing messages</h3>)
            : 
            data.map((message) => (
              <Card key={message.id} className="w-full">
                <CardHeader>
                  <CardTitle>{message.subject}</CardTitle>
                  <CardDescription>
                    from: {message.name} <br />
                    date: {formatDateTime(message.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{message.message.slice(0, 170)}...</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="m-3">{message.email}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                     <Button>View Message</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{message.subject}</DialogTitle>
                        <DialogDescription>
                          from: {message.name} <br />
                          date: {formatDateTime(message.createdAt)}
                        </DialogDescription>

                        <main>
                          <p>{message.message}</p>
                        </main>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="destructive">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
        </section>
      </main>
    </>
  );
}

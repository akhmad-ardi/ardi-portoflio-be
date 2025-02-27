import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (user) {
      return redirect("/protected");
    }

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  );
}

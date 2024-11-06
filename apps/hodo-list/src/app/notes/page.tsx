import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = await createClient();
  const { data: tasks } = await supabase.from("tasks").select("*");
  console.log("🚀 ~ Notes ~ tasks:", tasks);

  return <pre>{JSON.stringify(tasks, null, 2)}</pre>;
}

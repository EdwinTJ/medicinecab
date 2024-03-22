import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation";
export default async function Page() {
    const { data:{session}} = await supabase.auth.getSession();
    
    if(session){
        redirect("/");
    }
    return(
       <p>Unathorized</p>
    )
}
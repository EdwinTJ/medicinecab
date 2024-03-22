import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import {NextResponse } from "next/server";
export async function middleware(request) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res });
    
    const {data :{session},error} = await supabase.auth.getSession();
    console.log("session",session)

    if(!session){
      return NextResponse.rewrite(new URL("/",request.url))
    }


    return res;

}

export const config = {
    matcher: [
      /*
       * Match all request paths except:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
       * Feel free to modify this pattern to include more paths.
       */
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
  };
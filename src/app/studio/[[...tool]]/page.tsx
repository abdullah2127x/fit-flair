// /**
//  * This route is responsible for the built-in authoring environment using Sanity Studio.
//  * All routes under your studio path is handled by this file using Next.js' catch-all routes:
//  * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
//  *
//  * You can learn more about the next-sanity package here:
//  * https://github.com/sanity-io/next-sanity
//  */

// import { NextStudio } from "next-sanity/studio";
// import config from "../../../../sanity.config";
// import { isAdminClerkId } from "@/lib/utils";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// // export const dynamic = "force-static";
// export const dynamic = "force-dynamic";

// export { metadata, viewport } from "next-sanity/studio";

// export default async function StudioPage() {
//   // Use Clerk server-side auth
//   const { userId } = await auth();
//   if (!userId) {
//     return redirect("/shop");
//   }
//   if (!isAdminClerkId(userId)) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center",
//           gap: "2rem",
//         }}
//       >
//         <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Access Denied</h1>
//         <div style={{ color: "#888", maxWidth: 500 }}>
//           You must be an admin to access the Studio.
//           <br />
//           If you believe this is an error, please contact the site
//           administrator.
//         </div>
//         <a
//           href="/sign-in"
//           style={{ color: "#3b82f6", fontWeight: "500", marginTop: 16 }}
//         >
//           Sign in as admin
//         </a>
//       </div>
//     );
//   }
//   return <NextStudio config={config} />;
// }

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path are handled by this file.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isAdminClerkId } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";
export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const { userId } = await auth();

  // If not logged in, just redirect to shop
  if (!userId) {
    return redirect("/shop");
  }

  // If the user is not admin, show "Start Shopping" page
  if (!isAdminClerkId(userId)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary via-white to-primary text-primary-foreground px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-pulse">
          Access Denied 🚫
        </h1>
        <p className="text-secondary-foreground max-w-md text-center mb-8">
          You can&apos;`t access the admin studio — but don&apos;`t worry!
          <br />
          Let&apos;`s get back to what matters most. 🛍️
        </p>
        <Button variant="secondary" size={"lg"} asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  // If admin, show Sanity Studio
  return <NextStudio config={config} />;
}

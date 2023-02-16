import { useRouter } from "next/router";
import { useMemo } from "react";

const generatePathParts = ( pathStr: string ) => {
    const pathWithoutQuery = pathStr.split( "?" )[0];
    return pathWithoutQuery?.split( "/" ).filter(v => v.length > 0) ?? [];
}

export const useBreadcrumbs = () => {
    const router = useRouter();

    const breadcrumbs = useMemo(() => {
      const asPathNestedRoutes = generatePathParts(router.asPath);
  
      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice( 0, idx + 1 ).join("/");
        return {
          href, 
          text: subpath
        }; 
      })
  
      return [ { href: "/", text: "Home" }, ...crumblist ];

    }, [router.asPath] );

    return breadcrumbs;
}

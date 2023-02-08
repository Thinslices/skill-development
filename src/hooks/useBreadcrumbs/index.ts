import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

const generatePathParts = ( pathStr: string ) => {
    const pathWithoutQuery = pathStr.split( "?" )[0];
    return pathWithoutQuery?.split( "/" ).filter(v => v.length > 0) ?? [];
}

const useBreadcrumbs = () => {
    const router = useRouter();

    const breadcrumbs = useMemo(function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath);
      const pathnameNestedRoutes = generatePathParts(router.pathname);
  
      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        // Pull out and convert "[post_id]" into "post_id"
        const param = pathnameNestedRoutes[idx]?.replace( "[", "" ).replace( "]", "" );
  
        const href = "/" + asPathNestedRoutes.slice( 0, idx + 1 ).join("/");
        return {
          href, 
          text: subpath
        }; 
      })
  
      return [ { href: "/", text: "Home" }, ...crumblist ];

    }, [ router.asPath, router.pathname ] );

    return breadcrumbs;
}

export default useBreadcrumbs;

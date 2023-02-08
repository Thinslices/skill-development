import { useSession } from "next-auth/react";

export const Search: React.FC = () => {
      const { data: sessionData } = useSession();

      if ( ! sessionData ) {
        return null;
      }

    return (
        <>Search</>
    )
}
  
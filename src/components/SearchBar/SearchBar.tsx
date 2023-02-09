import { useSession } from "next-auth/react";
import Image from "next/image";

export const Search: React.FC = () => {
      const { data: sessionData } = useSession();

      if ( ! sessionData ) {
        return null;
      }

    return (
        <div className="flex gap-4 py-3 border-b border-b-borders focus-within:border-b-black w-full max-w-xl">
          <input className="outline-0 h4 w-full" type="text" placeholder="Search" />
          <Image className="" src="/search.svg" alt="search icon" width={ 20 } height={ 20 } />
        </div>
    )
}
  
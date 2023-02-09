import { useSession } from "next-auth/react";
import Image from "next/image";

export const Search: React.FC = () => {
      const { data: sessionData } = useSession();

      if ( ! sessionData ) {
        return null;
      }

    return (
        <div className="flex gap-4 py-2 border-b border-b-borders focus-within:border-b-black">
          <input className="outline-0" type="text" placeholder="Search" />
          <Image className="" src="/search.svg" alt="search icon" width={ 16 } height={ 16 } />
        </div>
    )
}
  
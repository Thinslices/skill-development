import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, UserAvatar, VerticalEllipsis } from "..";

export const UserMenu: React.FC = () => {
    const router = useRouter();
  
    return (
      <div className="relative group">
        <div className="flex items-center gap-2">
          <UserAvatar/>
          <VerticalEllipsis/>
        </div>
        <div className="absolute top-full right-0 pt-2 hidden group-hover:block">
          <ul className="whitespace-nowrap bg-white border-2 border-black rounded w-48 text-right">
            <li className="border-b border-b-borders"><Button style="text" onClick={ () => void router.push( '/studies/my-studies' ) }>My Studies</Button></li>
            <li><Button style="text" onClick={ () => void signOut() }>Sign out</Button></li>
          </ul>
        </div>
      </div>
    )
  }
  
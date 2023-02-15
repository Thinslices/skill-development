import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, UserAvatar, VerticalEllipsis } from "..";

export const UserMenu: React.FC = () => {
    const router = useRouter();
  
    return (
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer transition-opacity group-hover:opacity-50 duration-200 ease-out">
          <UserAvatar/>
          <VerticalEllipsis/>
        </div>
        <div className="absolute top-full right-0 pt-2 translate-y-2 transition-all duration-300 ease-out opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
          <ul className="whitespace-nowrap bg-white border-2 border-black rounded w-48 text-right">
            <li className="border-b border-b-borders">
              <Button className="px-4" style="text" onClick={ () => void router.push( '/studies/my-studies' ) }>My Studies</Button>
            </li>
            <li>
              <Button className="px-4" style="text" onClick={ () => void signOut() }>Sign out</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
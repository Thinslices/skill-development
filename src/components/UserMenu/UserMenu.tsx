import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, UserAvatar, VerticalEllipsis } from '..';

export const UserMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div className="group relative">
      <div className="flex cursor-pointer items-center gap-2 transition-opacity duration-200 ease-out group-hover:opacity-50">
        <UserAvatar />
        <VerticalEllipsis />
      </div>
      <div className="pointer-events-none absolute top-full right-0 translate-y-2 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <ul className="w-48 whitespace-nowrap rounded border-2 border-black bg-white text-right">
          <li className="border-b border-b-borders">
            <Button
              className="px-4"
              style="text"
              onClick={() => void router.push('/studies/my-studies')}>
              My Studies
            </Button>
          </li>
          <li>
            <Button
              className="px-4"
              style="text"
              onClick={() => void signOut()}>
              Sign out
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

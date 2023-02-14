import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { Button, Buttons, Plus, UserMenu } from '..';

export const MainMenu: React.FC = () => {
  const { data: sessionData } = useSession();

  if ( ! sessionData ) {
    return (
      <Button style="tertiary" onClick={ () => void signIn( 'google' ) }>
        Sign in
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-8">
      <Buttons>
        <Link href="/users" passHref><Button style={ 'text' }>Users</Button></Link>
        <Link href="/studies" passHref><Button style={ 'text' }>Studies</Button></Link>
        <Link href="/studies/add" passHref><Button>
          <span>Add Study</span><Plus />
        </Button></Link>
      </Buttons>
      <UserMenu />
    </div>
  )
}
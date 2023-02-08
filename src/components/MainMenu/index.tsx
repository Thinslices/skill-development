import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Buttons } from '..';

const VerticalEllipsis: React.FC = () => {
  return (
    <div className="flex flex-col gap-0.5">
      { 
        new Array( 3 ).fill( undefined ).map( ( value, index ) => {
          return (
            <div key={ index } className="w-1.5 h-1.5 rounded-full bg-black"></div>
          )
        } )
      }
    </div>
  )
}

const UserAvatar: React.FC = () => {
  const { data: sessionData } = useSession();
  const altText = sessionData?.user?.name ? `${ sessionData.user.name }'s avatar` : '';

  return (
    <div className="w-14 h-14 rounded-full border-2 overflow-hidden">
      { sessionData?.user.image && <img alt={ altText } src={ sessionData.user?.image } width={ 96 } height={ 96 } /> }
    </div>
  )
}

const UserMenu: React.FC = () => {
  
  return (
    <div className="flex items-center gap-2">
      <UserAvatar/>
      <VerticalEllipsis/>
    </div>
  )
}

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
        <Link href="/studies" passHref><Button style={ 'text' }>Studies</Button></Link>
        <Link href="/studies/add" passHref><Button>Add study</Button></Link>
      </Buttons>
      <UserMenu />
    </div>
  )
}
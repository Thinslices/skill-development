import { signIn, useSession } from "next-auth/react";
import { Button, Buttons } from "..";

export const Authorize: React.FC<React.PropsWithChildren> = ( { children } ) => {
    const { status } = useSession();
  
    if ( status === 'loading' ) {
      return (
        <div>Loading...</div>
      )
    }
  
    if ( status === 'unauthenticated' ) {
  
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="h1">Unauthorized</h1>
            <p>Please sign in to be able to access the Thinslices Knowledge database and upload your own studies.</p>
          </div>
          <Buttons>
            <Button style="tertiary" onClick={ () => void signIn( 'google' ) }>Sign in</Button>
          </Buttons>
        </div>
      )
    }
  
    return (
      <>
        { children }
      </>
    );
}

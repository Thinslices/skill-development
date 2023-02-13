import { useSession } from "next-auth/react";

export const UserAvatar: React.FC = () => {
    const { data: sessionData } = useSession();
    const altText = sessionData?.user?.name ? `${ sessionData.user.name }'s avatar` : '';
  
    return (
      <div className="w-14 h-14 rounded-full border-2 overflow-hidden">
        { sessionData?.user.image && <img alt={ altText } src={ sessionData.user?.image } width={ 96 } height={ 96 } /> }
      </div>
    )
  }
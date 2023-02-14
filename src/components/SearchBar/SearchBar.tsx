import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEventHandler } from "react";
import { useCallback, useRef } from "react";

export const Search: React.FC = () => {
  const router = useRouter();
  const { s } = router.query;
  const inputRef = useRef<HTMLInputElement>( null );

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>( ( event ) => {
    event.preventDefault();
    void router.push( `/studies/search?s=${ inputRef?.current?.value ?? '/studies' }` );
  }, [ router ] )

  return (
      <form className="flex gap-4 py-3 border-b border-b-borders focus-within:border-b-black w-full max-w-xl" onSubmit={ onSubmit }>
        <input ref={ inputRef } defaultValue={ s } className="outline-0 text-xl tracking-tight w-full" type="text" placeholder="Search study" />
        <Image className="" src="/search.svg" alt="search icon" width={ 20 } height={ 20 } />
      </form>
  )
}
  
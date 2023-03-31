import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FormEventHandler } from 'react';
import { useCallback, useRef } from 'react';

export const Search: React.FC = () => {
  const router = useRouter();
  const { s } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      event.preventDefault();
      void router.push(
        `/studies/search?s=${inputRef?.current?.value ?? '/studies'}`
      );
    },
    [router]
  );

  return (
    <form
      className="flex w-full max-w-xl gap-4 border-b border-b-borders py-3 focus-within:border-b-black"
      onSubmit={onSubmit}>
      <input
        ref={inputRef}
        defaultValue={s}
        className="w-full text-xl tracking-tight outline-0"
        type="text"
        placeholder="Search study"
      />
      <Image
        className=""
        src="/search.svg"
        alt="search icon"
        width={20}
        height={20}
      />
    </form>
  );
};

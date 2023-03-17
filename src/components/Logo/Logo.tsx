import { useRef } from 'react';
import { useLogoAnimation } from './useLogoAnimation';
import Image from 'next/image';

export const Logo: React.FC = () => {
    const thinslicesRef = useRef<HTMLDivElement>(null);
    const knowledgeRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);

    useLogoAnimation(wrapperRef, thinslicesRef, knowledgeRef, iconRef);

    return (
        <div className="pr-8">
            <div className="relative">
                <div className="h1 leading-normal" ref={wrapperRef}>
                    <div className="absolute" ref={thinslicesRef}>
                        thinslices
                    </div>
                    <div className="absolute" ref={knowledgeRef}>
                        knowledge
                    </div>
                </div>
                <Image
                    ref={iconRef}
                    className="absolute left-full top-3 ml-2"
                    src="/logo-icon.svg"
                    alt="Logo icon"
                    width={20}
                    height={20}
                />
            </div>
        </div>
    );
};

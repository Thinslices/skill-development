import Link from "next/link";
import { Logo, MainMenu, Search, Wrapper } from "..";

export const Header: React.FC = () => {
    return (
        <Wrapper className="border-b border-b-borders">
            <div className="flex items-center justify-between gap-8 py-4">
                <div>
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className="flex grow justify-center">
                    <Search />
                </div>
                <div>
                    <MainMenu />
                </div>
            </div>
        </Wrapper>
    );
};

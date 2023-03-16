import { Authorize, Breadcrumbs, Header, Wrapper } from "..";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    <div className="space-y-8">
                        <Breadcrumbs />
                        {children}
                    </div>
                </Authorize>
            </Wrapper>
        </>
    );
};

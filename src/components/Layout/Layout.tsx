import { Authorize, Header, Wrapper } from "..";

export const Layout:React.FC<React.PropsWithChildren> = ( { children } ) => {
    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    { children }
                </Authorize>
            </Wrapper>
        </>
    )
}

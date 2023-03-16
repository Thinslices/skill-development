import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Authorize, Button, Header, Wrapper } from "../components";

const Home: NextPage = () => {
    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    <div className="space-y-8">
                        <div className="max-w-3xl space-y-4">
                            <h1 className="h1">Welcome</h1>
                            <p className="text-2xl">
                                Share the knowledge you gathered on a skill by
                                creating a study comprised of a series questions
                                and answers on the subject, or browse and read
                                studies created by your peers.
                            </p>
                        </div>
                        <Link className="block" href="/studies">
                            <Button style="secondary">View studies</Button>
                        </Link>
                    </div>
                </Authorize>
            </Wrapper>
        </>
    );
};

export default Home;

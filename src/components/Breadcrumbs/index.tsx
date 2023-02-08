import Link from "next/link"

type Crumb = {
    href: string,
    text: string
}

type BreadcrumbsProps = {
    breadcrumbs: Array<Crumb>
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ( props ) => {
    const { breadcrumbs } = props;

    return (
        <div className="flex gap-2 capitalize">
            { breadcrumbs.map( ( crumb, index ) => {
                return (
                    <>
                        <Link key={ crumb.href } href={ crumb.href }>{ crumb.text }</Link>
                        { index < breadcrumbs.length - 1 && <div>&raquo;</div> }
                    </>
                )
            } ) }
        </div>
    )
}

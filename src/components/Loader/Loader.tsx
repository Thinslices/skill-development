import { useEffect, useState } from "react";
import { useLoader } from "../../hooks";

export const Loader:React.FC = () => {
    const [ rotation, setRotation ] = useState<string>( '135deg' );
    const { isLoading } = useLoader();
    
    useEffect( () => {
        const nextRotation = rotation === '135deg' ? '0deg' : '135deg';

        const timeout = setTimeout( () => {
            setRotation( nextRotation );
        }, 2000 );

        return () => {
            clearTimeout( timeout );
        }
    }, [ rotation ] );

    const style = { 
        rotate: rotation,
        transitionTimingFunction: 'cubic-bezier(0.7, -1, 0.3, 2)',
        transitionDuration: '1000ms'
    };

    return (
        <div className={ `fixed inset-0 transition-opacity duration-300 flex items-center justify-center ${ ! isLoading ? 'opacity-0 pointer-events-none' : '' }` }>
            <div className="absolute inset-0 bg-white opacity-75"></div>
            <div className="relative">
                <img className="transition-all" src="/logo-icon.svg" width={ 75 } height={ 75 } style={ style } />
            </div>
        </div>
    )
}

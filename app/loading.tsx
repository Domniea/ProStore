import Image from "next/image";
import loader from '@/assets/loader.gif'

const LoadingScreen = () => {

    return ( 
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <Image 
                src={loader} 
                height={150}
                // width={'auto'}
                alt="loading..."
            />
        </div>
     );
}
 
export default LoadingScreen;
import React,{PropsWithChildren} from 'react';

import Header from '@/components/header';
import Footer from '@/components/footer';

interface Props extends PropsWithChildren{
    
}
 
export const AppLayout: React.FC<Props> = ({children}) => {
    return (
        <>
        <Header />
        {
            children
        }
        <Footer/>
        </>
        );
}

export default AppLayout;
 
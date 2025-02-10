import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import api from "@/services/api";

import Header from "@/components/header";
import Footer from "@/components/footer";

interface Props extends PropsWithChildren {
	privatized ?:boolean
}

export const AppLayout: React.FC<Props> = ({ children, privatized=true }) => {

  const navigate = useNavigate();
// // { data: refreshData, error: refreshError, isLoading: refreshLoading }
 const {isError} = api.useRefreshQuery();

	useEffect(()=>{
		if(privatized){
			if( isError ){
				navigate('/')
			}
		}
	},[isError])

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default AppLayout;

import React, { PropsWithChildren,useEffect } from "react";
import api from "@/services/api";
import { useNavigate  } from "react-router-dom";


interface Props extends PropsWithChildren {
}

export const AuthLayout: React.FC<Props> = ({ children  }) => {

// { data: refreshData, error: refreshError, isLoading: refreshLoading }
const navigate = useNavigate();

  const {data: refreshData} = api.useRefreshQuery();

	useEffect(()=>{

		if( refreshData && refreshData.success){
			navigate('/home')
		}

	},[refreshData])

	return (
		<>
			{children}
		</>
	);
    
};

export default AuthLayout;
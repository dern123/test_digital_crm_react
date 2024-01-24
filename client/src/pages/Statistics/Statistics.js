import React, { useCallback, useEffect } from 'react';
import { useApiGetHook } from '../../hooks/api.get.hook';

const Statistics = () => {
    const { loading, getRequest, error, clearError } = useApiGetHook();

    const getStatistics = useCallback(async () => {
        try{
         const data = await getRequest("/statistic/get", {});
         console.log("🚀 ~ getStatistics ~ data:", data)
        }catch(e){
            console.error(e)
        }
    },[getRequest]);

    useEffect(() =>{
      getStatistics();
    },[getStatistics]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <>
        <div>
            <h1>Statistics</h1>
        </div>
        </>  
    );
}
 
export default Statistics;
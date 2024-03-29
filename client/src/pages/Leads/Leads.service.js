// import { useState, useCallback } from 'react';

// const useFetchLeads = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchLeads = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
//     setLoading(true);
//     try {
//       if (body) {
//         body = JSON.stringify(body);
//         headers['Content-Type'] = 'application/json';
//       }
//       const response = await fetch(url, { method, body, headers });
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong :(');
//       }

//       setLoading(false);
//       return data;
//     } catch (e) {
//       setLoading(false);
//       setError(e.message);
//       throw e;
//     }
//   }, []);

//   const clearError = useCallback(() => setError(null), []);

//   return { loading, fetchLeads, error, clearError };
// };

// export default useFetchLeads;
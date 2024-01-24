import React from 'react';
import Page404 from '../pages/Page404/Page404';
import Dashboard from '../pages/Daashboard/Dashboard';
import List from '../pages/Leads/List/List';
import { Routes, Route, Navigate } from 'react-router-dom';
import Statistics from '../pages/Statistics/Statistics';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'  render={() => {
              return <Navigate to='/dashboard'/>
          }}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leads" element={<List />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewAnalysis from '../pages/New analysis/NewAnalysis';
import FinishedAnalysis from '../pages/Finished analysis/FinishedAnalysis';
import DrawerAppBar from '../pages/Navbar/DrawerAppBar';
import Characters from '../pages/Characters/Characters';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DrawerAppBar />}>
          <Route index element={<NewAnalysis />} />
          <Route path="finished_analysis/:id?" element={<FinishedAnalysis />} />
          <Route path="characters" element={<Characters />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;

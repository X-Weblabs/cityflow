import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-primary flex flex-col">
      <DashboardNavbar />
      
      {/* 
        On Desktop: h-20 top navbar (pt-20)
        On Mobile: h-16 top header (pt-16) + h-20 bottom bar (pb-20)
      */}
      <main className="flex-1 pt-14 lg:pt-16 pb-20 lg:pb-0 px-4 md:px-6 lg:px-8 max-w-[1500px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="py-6"
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="hidden lg:block px-6 lg:px-10 py-8 text-center text-on-surface-variant font-medium text-xs border-t border-outline-variant/10">
        © 2026 Bulawayo Civic Sentinel • Integrated Council Administrative Portal
      </footer>
    </div>
  );
};

export default DashboardLayout;

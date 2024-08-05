'use client'
import React, { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import AddNewInterview from './_components/AddNewInterview';

function Dashboard() {
  // Assuming GetInterviewDetails is a function or a variable you need to use within useEffect
  const GetInterviewDetails = () => {
    // Function implementation here
  };

  useEffect(() => {
    GetInterviewDetails();
  }, [GetInterviewDetails]); // Add GetInterviewDetails to the dependency array

  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>create and start your Ai mock interview</h2>
      <div className='grid grid-cols md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>
    </div>
  );
}

export default Dashboard;

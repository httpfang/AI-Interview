'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
  

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div className="p-10border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all" onClick={()=>setOpenDialog(true)}>
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tells Us More About Your Interviewing</DialogTitle>
            <DialogDescription>
              <div>
                <h2>Add details about your job position/role, job description and years of experience</h2>
                <div className='mt-4 my-2 text-xl'>
                    <lebel >job role/job position</lebel>
                    <Input className="mt-3" placeholder="Eg: frontend developer" />
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <Button className="border-none" variant = "ghost" onClick={()=> setOpenDialog(false)}>Cancel</Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview

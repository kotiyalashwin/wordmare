'use client'

import React, { useState } from 'react';
import useInputStore from '@/store/inputs';

// shadcn/ui components
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const InputBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const {
    addInput,
    removeInput,
    getAllInputs,
  } = useInputStore();

  const inputs = getAllInputs();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addInput(value.trim());
      setValue('');
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className='text-teal-800 border-teal-400 border-2'>Add Input</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>
                Input name
            </DialogTitle>
            <DialogDescription>
              These inputs will be asked when you run the flow
            </DialogDescription>
          <form onSubmit={handleAdd}>
            <Input
              placeholder="Enter input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              required
            />
            <DialogFooter className='p-2'>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex gap-2 mt-4 flex-wrap">
        {inputs.map((input, idx) => (
          <Badge key={idx} className="flex bg-white text-teal-500 text-lg items-center gap-1 pr-2">
            <span className='font-semibold'>{input}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => removeInput(idx)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default InputBox;

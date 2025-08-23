"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import axios from "axios";

const HomePage = () => {

  const fetchAnimals = async()=>{
      const res = await axios.get('/api/animals');
      console.log(res);
    }

  useEffect(()=>{
    fetchAnimals();
  },[])
  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;

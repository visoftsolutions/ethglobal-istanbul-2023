"use client";

import { Info } from "@/sections/Info";

const drinks = [
  {
    name: 'BULBAZAUR',
    id: 1,
    description: 'adsasdaa sd as da sd as d asd a sd as d',
    image: ''
  }
];


export default function Page() {
  return (
    <main className="relative h-screen w-auto flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className='min-h-screen w-screen overflow-x-hidden mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50'>
        <div className="bg-black/75 absolute w-screen h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <video autoPlay loop muted className='h-screen w-[200vw] overflow-x-auto'>
          <source src="bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
      

      <Info />
    </main>
  );
}

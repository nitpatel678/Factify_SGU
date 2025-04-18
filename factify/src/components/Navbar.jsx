import React from 'react';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-gray-900">
      <h1 id='heading' className="text-3xl font-bold text-white tracking-widest">Factify</h1>
      <nav
        id='navlinks'
        className="hidden sm:flex space-x-6"
      >
        <a href="#" className="hover:text-zinc-100 text-white">Home</a>
        <a href="#about" className="hover:text-zinc-100 text-white">About</a>
        <a href="#team" className="hover:text-zinc-100 text-white">Team</a>
      </nav>
    </header>
  );
}

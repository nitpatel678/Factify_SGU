import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id='navlink' className="pb-4 bg-gray-900 flex justify-between items-center">
      <div className="flex space-x-6 text text-white mt-5 ml-5 ">
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
      </div>
      <div className="flex space-x-4 text-white mt-5 mr-5">
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
          <Github size={20} />
        </a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
          <Linkedin size={20} />
        </a>
      </div>
    </footer>
  );
}

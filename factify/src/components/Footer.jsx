import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id='navlink' className="bg-gray-900 text-white py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-4">
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/nitpatel678/Factify_SGU" className="hover:text-gray-400">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/nitinpatelftp/" className="hover:text-gray-400">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

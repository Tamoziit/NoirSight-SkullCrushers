import { Link, useNavigate } from 'react-router-dom';
import { UserButton } from '@civic/auth/react';
import { ArrowLeft } from 'lucide-react';

const DocumentationNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 w-full px-6 py-4 bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors inter-font"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center: Logo */}
        <div className="flex items-center space-x-3">
          <img src="/eye.png" alt="Noir Sight Logo" className="w-6 h-6" />
          <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
        </div>

        {/* Right: User Button */}
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default DocumentationNav;

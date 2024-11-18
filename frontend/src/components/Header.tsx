import React from "react";

interface HeaderProps {
  token: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ token, onLogout }) => {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-indigo-600">Todo App</h1>
        {token && (
          <button
            onClick={onLogout}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Logout
          </button>
        )}
      </header>
    </>
  );
};

export default Header;

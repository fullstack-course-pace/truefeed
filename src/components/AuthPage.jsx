import React from 'react';
import LeftPanel from './LeftPanel';
import SignupForm from './SignupForm';

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/70 via-blue-50/50 to-purple-100/60 flex items-center justify-center p-4 lg:p-6">
      {/* Outer container with white border/padding */}
      <div className="w-full max-w-[1100px] bg-white rounded-[32px] shadow-[0_20px_70px_-15px_rgba(139,92,246,0.4)] p-4 lg:p-5">
        {/* Inner container with rounded corners */}
        <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row min-h-[650px]">
            <LeftPanel />
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
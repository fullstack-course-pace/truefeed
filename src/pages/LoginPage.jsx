import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import LeftPanel from '../components/LeftPanel';
import LiquidEther from '../components/common/LiquidEther';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* LiquidEther Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Login Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex relative z-10"
      >
        <LeftPanel />
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
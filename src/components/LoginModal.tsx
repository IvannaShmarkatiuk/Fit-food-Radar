import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1A1A] w-full max-w-[400px] rounded-xl border border-[#333333] shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#8A8278] hover:text-[#EDE8D0] transition-colors focus:outline-none"
                aria-label="Закрити вікно"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#EDE8D0] mb-2">
                    Вхід
                  </h2>
                  <p className="text-[#8A8278]">
                    де поїсти ФІТ
                  </p>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-[#B8B0A0] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg px-4 py-3 text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent transition-all"
                      placeholder="email@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#B8B0A0] mb-1.5">
                      Пароль
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg px-4 py-3 text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-[#333333] bg-[#121212] text-[#2E7D32] focus:ring-[#2E7D32]"
                      />
                      <span className="text-sm text-[#8A8278]">
                        Запам'ятати мене
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-[#C45A2A] hover:text-[#d66f42] transition-colors"
                    >
                      Забули пароль?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2E7D32] hover:bg-[#236026] text-[#EDE8D0] font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
                  >
                    Увійти
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-[#8A8278] text-sm">
                    Ще немає акаунту?{' '}
                    <a
                      href="#"
                      className="text-[#C45A2A] hover:text-[#d66f42] font-medium transition-colors"
                    >
                      Зареєструватися
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
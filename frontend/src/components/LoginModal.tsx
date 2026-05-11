import React, { useState } from 'react';
import { XIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

export interface UserData {
  id: number;
  name: string;
  avatarUrl: string | null;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: UserData) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const API_URL = 'https://fitfood-api.onrender.com';
  
  // Режим: 'login' (Вхід) або 'register' (Реєстрація)
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      const endpoint = isLoginMode ? `${API_URL}/api/Users/login` : `${API_URL}/api/Users`;
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLoginMode ? { email, password } : { name, email, password })
      });

      if (res.ok) {
        const userData = await res.json();
        onLogin({
          id: userData.id,
          name: userData.name,
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userData.name
        });
      } else {
        const errorText = await res.text();
        alert(isLoginMode ? "Невірний email або пароль" : `Помилка: ${errorText || "Пошта вже зайнята"}`);
      }
    } catch (e) {
      alert("Сервер Майї не відповідає. Перевір налаштування Mixed Content!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-3xl border border-[#333333] p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#8A8278] hover:text-white transition-colors">
          <XIcon size={24} />
        </button>

        {/* Перемикач режимів */}
        <div className="flex bg-[#121212] p-1 rounded-2xl mb-8 border border-[#333333]">
          <button 
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${isLoginMode ? 'bg-[#C45A2A] text-white shadow-lg' : 'text-[#8A8278]'}`}
          >
            Вхід
          </button>
          <button 
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${!isLoginMode ? 'bg-[#C45A2A] text-white shadow-lg' : 'text-[#8A8278]'}`}
          >
            Реєстрація
          </button>
        </div>

        <h2 className="text-3xl font-black text-[#EDE8D0] mb-8 text-center uppercase tracking-tighter">
          {isLoginMode ? 'З поверненням!' : 'Створити профіль'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#C45A2A] ml-2">Як вас звати?</label>
              <input 
                type="text" value={name} onChange={e => setName(e.target.value)} 
                placeholder="Ім'я" 
                className="w-full p-4 bg-[#121212] border border-[#333333] rounded-2xl text-white outline-none focus:border-[#C45A2A] transition-all" 
                required 
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#C45A2A] ml-2">Електронна пошта</label>
            <input 
              type="email" value={email} onChange={e => setEmail(e.target.value)} 
              placeholder="email@example.com" 
              className="w-full p-4 bg-[#121212] border border-[#333333] rounded-2xl text-white outline-none focus:border-[#C45A2A] transition-all" 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#C45A2A] ml-2">Пароль</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full p-4 bg-[#121212] border border-[#333333] rounded-2xl text-white outline-none focus:border-[#C45A2A] transition-all" 
                required 
              />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8278] hover:text-white"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting} 
            className="w-full py-4 bg-[#2E7D32] text-white font-black rounded-2xl hover:bg-[#236026] transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-4 uppercase tracking-widest"
          >
            {isSubmitting ? 'Вантажимо...' : (isLoginMode ? 'Увійти' : 'Зареєструватися')}
          </button>
        </form>

        <p className="mt-8 text-center text-[#8A8278] text-sm font-medium">
          {isLoginMode ? 'Вперше тут?' : 'Вже маєте акаунт?'} 
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="ml-2 text-[#C45A2A] font-bold hover:underline"
          >
            {isLoginMode ? 'Створити акаунт' : 'Увійти'}
          </button>
        </p>
      </div>
    </div>
  );
}
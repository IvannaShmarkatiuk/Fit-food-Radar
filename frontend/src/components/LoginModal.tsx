import React, { useState, useEffect } from 'react';
import { XIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna'
];

// ЦЕЙ ЕКСПОРТ ВИПРАВИТЬ ПОМИЛКУ В APP.TSX
export interface UserData {
  name: string;
  avatarUrl: string | null;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: UserData) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(PRESET_AVATARS[0]);

  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('user_name_cache');
      if (savedName) setName(savedName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      localStorage.setItem('user_name_cache', name);
      onLogin({ name, avatarUrl });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-[#333333] shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#8A8278] hover:text-[#EDE8D0]">
          <XIcon className="w-5 h-5" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#EDE8D0] mb-6">Реєстрація / Вхід</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#B8B0A0] mb-3">Оберіть аватарку</label>
              <div className="grid grid-cols-6 gap-3">
                {PRESET_AVATARS.map((url) => (
                  <button key={url} type="button" onClick={() => setAvatarUrl(url)} 
                    className={`w-10 h-10 rounded-full border-2 transition-all ${avatarUrl === url ? 'border-[#C45A2A] scale-110' : 'border-transparent'}`}>
                    <img src={url} alt="avatar" className="w-full h-full bg-[#EDE8D0] rounded-full" />
                  </button>
                ))}
              </div>
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Як вас звати?" className="w-full px-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0]" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Електронна пошта" className="w-full px-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0]" required />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" className="w-full px-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0]" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8278]">
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full py-3 bg-[#2E7D32] hover:bg-[#236026] text-[#EDE8D0] font-bold rounded-lg">Увійти</button>
          </form>
        </div>
      </div>
    </div>
  );
}
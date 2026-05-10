import React, { useState, useEffect } from 'react';
import { XIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

export interface UserData {
  name: string;
  avatarUrl: string | null;
}

const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver'
];

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
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-[#333333] p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8A8278] hover:text-[#EDE8D0]">
          <XIcon size={20} />
        </button>
        <h2 className="text-2xl font-bold text-[#EDE8D0] mb-2">Реєстрація / Вхід</h2>
        <p className="text-[#8A8278] text-sm mb-6">Профіль для відгуків та обраного.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESET_AVATARS.map(url => (
              <img key={url} src={url} alt="av" onClick={() => setAvatarUrl(url)} 
                className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all ${avatarUrl === url ? 'border-[#C45A2A] scale-110' : 'border-transparent opacity-50'}`} />
            ))}
          </div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Як вас звати?" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white outline-none focus:border-[#C45A2A]" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@gmail.com" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white outline-none focus:border-[#C45A2A]" required />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white outline-none focus:border-[#C45A2A]" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8278]">
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          <button type="submit" className="w-full py-3 bg-[#2E7D32] text-white font-bold rounded-lg hover:bg-[#236026] transition-all">Увійти в систему</button>
        </form>
      </div>
    </div>
  );
}
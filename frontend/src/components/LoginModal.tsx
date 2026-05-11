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
  const API_URL = 'http://fitfood.runasp.net';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/Users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        const savedUser = await res.json();
        onLogin({ id: savedUser.id, name: savedUser.name, avatarUrl });
      } else {
        alert("Помилка реєстрації. Можливо, пошта вже зайнята?");
      }
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-[#333333] p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8A8278] hover:text-[#EDE8D0]"><XIcon size={20} /></button>
        <h2 className="text-2xl font-bold text-[#EDE8D0] mb-6 text-center uppercase tracking-widest">Реєстрація</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white" required />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className="w-full p-3 bg-[#121212] border border-[#333333] rounded-lg text-white" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8278]">
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#2E7D32] text-white font-bold rounded-lg hover:bg-[#236026] disabled:opacity-50">
            {isSubmitting ? "Створення..." : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { XIcon, UploadIcon } from 'lucide-react';

const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver'
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; avatarUrl: string | null }) => void;
  currentName: string;
  currentAvatar: string | null;
}

export function EditProfileModal({ isOpen, onClose, onSave, currentName, currentAvatar }: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Оновлюємо дані у формі, коли вікно відкривається
  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setAvatarUrl(currentAvatar);
    }
  }, [isOpen, currentName, currentAvatar]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name, avatarUrl });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-[#333333] shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#8A8278] hover:text-[#EDE8D0] hover:bg-[#252525] rounded-lg transition-colors">
          <XIcon className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#EDE8D0] mb-2">Редагувати профіль</h2>
          <p className="text-[#8A8278] mb-6">Оновіть своє ім'я або змініть аватарку.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#B8B0A0] mb-3">Оберіть нову аватарку</label>
              <div className="flex items-center gap-3">
                {PRESET_AVATARS.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setAvatarUrl(url)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${avatarUrl === url ? 'border-[#C45A2A] scale-110' : 'border-transparent hover:border-[#4A4A4A]'}`}
                  >
                    <img src={url} alt="preset" className="w-full h-full bg-[#EDE8D0]" />
                  </button>
                ))}
                <div className="w-px h-8 bg-[#333333] mx-2" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all overflow-hidden ${avatarUrl && !PRESET_AVATARS.includes(avatarUrl) ? 'border-[#C45A2A]' : 'border-dashed border-[#4A4A4A] hover:border-[#C45A2A] text-[#8A8278]'}`}
                >
                  {avatarUrl && !PRESET_AVATARS.includes(avatarUrl) ? (
                    <img src={avatarUrl} alt="uploaded" className="w-full h-full object-cover" />
                  ) : (
                    <UploadIcon className="w-5 h-5" />
                  )}
                </button>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#B8B0A0] mb-2">Ваше ім'я</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-[#121212] border border-[#333333] rounded-lg text-[#EDE8D0] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent transition-all" required />
            </div>

            <button type="submit" className="w-full py-3 mt-4 bg-[#C45A2A] hover:bg-[#A0451C] text-[#EDE8D0] font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
              Зберегти зміни
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
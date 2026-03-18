import React, { useState } from 'react';

// Додаємо опціональне поле avatarUrl до типу відгуків
export interface ExtendedReview {
  id: string;
  visitorName: string;
  date: string;
  text: string;
  avatarColor: string;
  avatarUrl?: string | null;
}

interface ReviewSectionProps {
  reviews: ExtendedReview[];
  onAddReview: (text: string) => void;
  isLoggedIn: boolean;
}

export function ReviewSection({ reviews, onAddReview, isLoggedIn }: ReviewSectionProps) {
  const [newReviewText, setNewReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewText.trim()) {
      onAddReview(newReviewText);
      setNewReviewText('');
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#EDE8D0] mb-6">Відгуки</h2>

      <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] mb-8 shadow-lg">
        {isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            <textarea value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="Поділіться своїми враженнями про заклад..." className="w-full bg-[#121212] border border-[#333333] rounded-lg p-4 text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:border-[#C45A2A] focus:ring-1 focus:ring-[#C45A2A] resize-none h-24 transition-all" required />
            <div className="flex justify-end mt-4">
              <button type="submit" className="px-6 py-2.5 bg-[#C45A2A] hover:bg-[#A0451C] text-[#EDE8D0] font-medium rounded-lg transition-colors">Опублікувати відгук</button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#8A8278] text-lg">Увійдіть в акаунт, щоб залишити відгук.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-[#1A1A1A] rounded-xl border border-[#333333]"><p className="text-[#8A8278]">Поки що немає відгуків. Будьте першими!</p></div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] transition-colors hover:border-[#4A4A4A]">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#EDE8D0] font-bold shadow-md overflow-hidden ${review.avatarColor}`}>
                  {review.avatarUrl ? (
                    <img src={review.avatarUrl} alt="avatar" className="w-full h-full object-cover bg-[#EDE8D0]" />
                  ) : (
                    review.visitorName.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="text-[#EDE8D0] font-medium">{review.visitorName}</p>
                  <p className="text-[#8A8278] text-sm">{review.date}</p>
                </div>
              </div>
              <p className="text-[#B8B0A0] leading-relaxed">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
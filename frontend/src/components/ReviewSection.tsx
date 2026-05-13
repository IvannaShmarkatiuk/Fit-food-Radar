import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
export interface ExtendedReview {
  id: string;
  visitorName: string;
  date: string;
  text: string;
  rating: number;
  avatarUrl?: string | null;
  avatarColor?: string;
}
interface ReviewSectionProps {
  reviews: ExtendedReview[];
  onAddReview: (text: string, rating: number) => void;
  isLoggedIn: boolean;
}

export function ReviewSection({ reviews, onAddReview, isLoggedIn }: ReviewSectionProps) {
  const [newReviewText, setNewReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewText.trim()) {
      onAddReview(newReviewText, rating);
      setNewReviewText('');
      setRating(5); 
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#EDE8D0] mb-6">Відгуки</h2>

      <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] mb-8 shadow-lg">
        {isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#B8B0A0] text-sm font-medium mr-2">Ваша оцінка:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <StarIcon
                      className={`w-6 h-6 transition-colors ${
                        star <= (hover || rating) 
                          ? 'text-[#C45A2A] fill-[#C45A2A]' 
                          : 'text-[#333333] fill-transparent'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea 
              value={newReviewText} 
              onChange={(e) => setNewReviewText(e.target.value)} 
              placeholder="Поділіться своїми враженнями..." 
              className="w-full bg-[#121212] border border-[#333333] rounded-lg p-4 text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:border-[#C45A2A] focus:ring-1 focus:ring-[#C45A2A] resize-none h-24 transition-all" 
              required 
            />
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
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] transition-colors hover:border-[#4A4A4A]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
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
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon 
                    key={s} 
                    className={`w-4 h-4 ${s <= (review.rating || 5) ? 'text-[#C45A2A] fill-[#C45A2A]' : 'text-[#333333]'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-[#B8B0A0] leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
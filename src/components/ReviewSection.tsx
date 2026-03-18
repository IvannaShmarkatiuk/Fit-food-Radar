import React from 'react';
import { Review } from '../data/reviews';

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="text-2xl font-bold text-[#EDE8D0] mb-6">Відгуки</h2>

      {/* Write Review Form */}
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333] mb-10">
        <textarea
          className="w-full bg-[#121212] border border-[#333333] rounded-lg p-4 text-[#EDE8D0] placeholder-[#8A8278] focus:outline-none focus:ring-2 focus:ring-[#C45A2A] focus:border-transparent resize-none min-h-[120px] mb-4"
          placeholder="Напишіть свій відгук..." />
        
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#236026] text-[#EDE8D0] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
            Залишити відгук
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex gap-4">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full ${review.avatarColor} flex items-center justify-center flex-shrink-0 text-[#EDE8D0] font-bold text-lg border border-[#333333]`}
              >
                {review.visitorName.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-[#EDE8D0] font-semibold">
                    {review.visitorName}
                  </h4>
                  <span className="text-[#8A8278] text-sm">{review.date}</span>
                </div>
                <p className="text-[#B8B0A0] leading-relaxed">{review.text}</p>
              </div>
            </div>

            {/* Divider */}
            {index < reviews.length - 1 && (
              <hr className="border-[#333333] mt-6" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
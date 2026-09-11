import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCountry?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  preselectedCountry,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetCountry: preselectedCountry || 'Ghana',
    timeline: 'Within 1 year',
    interests: ['Housing & Neighborhoods', 'Money & Banking'] as string[],
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync preselectedCountry if provided
  React.useEffect(() => {
    if (preselectedCountry) {
      setFormData((prev) => ({ ...prev, targetCountry: preselectedCountry }));
    }
  }, [preselectedCountry]);

  const countryOptions = [
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'Rwanda', flag: '🇷🇼' },
    { name: 'Senegal', flag: '🇸🇳' },
    { name: 'Tanzania', flag: '🇹🇿' },
    { name: 'Côte d’Ivoire', flag: '🇨🇮' },
    { name: 'Zambia', flag: '🇿🇲' },
    { name: 'The Gambia', flag: '🇬🇲' },
    { name: 'Sierra Leone', flag: '🇸🇱' },
    { name: 'Uganda', flag: '🇺🇬' },
    { name: 'Ethiopia', flag: '🇪🇹' },
    { name: 'Liberia', flag: '🇱🇷' },
    { name: 'Mauritius', flag: '🇲🇺' },
    { name: 'Multiple / Pan-Africa', flag: '🌍' },
  ];

  const interestOptions = [
    'Housing & Neighborhoods',
    'Money & Banking',
    'Remote Work & Tech',
    'Starting a Business',
    'Schools & Families',
    'Everyday Life & Healthcare',
  ];

  const toggleInterest = (item: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== item)
          : [...prev.interests, item],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#18191B]/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#18191B]/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#18191B]/8 bg-[#FDFBF7] flex items-center justify-between shrink-0">
          <div className="pr-2">
            <Logo variant="dark" />
            <p className="text-[10px] sm:text-[11px] font-bold text-[#C58B38] uppercase tracking-wider mt-1 leading-tight">
              Free Community for Diaspora & African Diaspora
            </p>
          </div>
          <button
            id="close-join-modal-btn"
            onClick={resetAndClose}
            className="p-1.5 sm:p-2 rounded-full text-[#18191B]/50 hover:text-[#18191B] hover:bg-[#18191B]/5 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#153826]/10 text-[#153826] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#153826]" />
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#18191B]">
                Welcome, {formData.name || 'Friend'}!
              </h4>
              <p className="text-xs sm:text-sm text-[#18191B]/75 leading-relaxed max-w-sm mx-auto">
                We’ve reserved your free founding membership. Access details have been sent to{' '}
                <strong className="text-[#18191B]">{formData.email || 'your email'}</strong>.
              </p>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#18191B]/8 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between text-[#18191B]/70">
                  <span>Destination Circle:</span>
                  <span className="font-bold text-[#18191B]">{formData.targetCountry}</span>
                </div>
                <div className="flex justify-between text-[#18191B]/70">
                  <span>Relocation Timeline:</span>
                  <span className="font-bold text-[#18191B]">{formData.timeline}</span>
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <a
                  id="success-facebook-btn"
                  href={FACEBOOK_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={resetAndClose}
                  className="w-full py-3 sm:py-3.5 rounded-full bg-[#153826] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#1D4B34] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Facebook Community Group</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18191B]/70 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  id="join-name-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Akua Mensah"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#18191B]/15 text-base sm:text-sm text-[#18191B] focus:outline-none focus:border-[#153826] focus:ring-1 focus:ring-[#153826]"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18191B]/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  id="join-email-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. akua@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#18191B]/15 text-base sm:text-sm text-[#18191B] focus:outline-none focus:border-[#153826] focus:ring-1 focus:ring-[#153826]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18191B]/70 mb-1">
                    Destination Circle
                  </label>
                  <select
                    id="join-destination-select"
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#18191B]/15 text-base sm:text-sm text-[#18191B] focus:outline-none focus:border-[#153826]"
                  >
                    {countryOptions.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18191B]/70 mb-1">
                    Timeline
                  </label>
                  <select
                    id="join-timeline-select"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#18191B]/15 text-base sm:text-sm text-[#18191B] focus:outline-none focus:border-[#153826]"
                  >
                    <option value="0-6 months">Next 0–6 months</option>
                    <option value="6-12 months">6–12 months</option>
                    <option value="1-2 years">1–2 years</option>
                    <option value="Exploring possibilities">Exploring & researching</option>
                  </select>
                </div>
              </div>

              {/* Interests multi-select */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18191B]/70 mb-1.5">
                  Top Topics of Interest
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((item) => {
                    const isSelected = formData.interests.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleInterest(item)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#153826] text-[#FAF7F2]'
                            : 'bg-white border border-[#18191B]/10 text-[#18191B]/75 hover:border-[#18191B]/25'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-join-form-btn"
                  className="w-full py-3.5 sm:py-4 rounded-full bg-[#153826] hover:bg-[#1D4B34] text-[#FAF7F2] font-bold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Our FREE Community</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </button>
              </div>

              <p className="text-[10px] sm:text-[11px] text-center text-[#18191B]/50 font-medium">
                Free community • Zero spam • Direct connections with returnees & locals
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

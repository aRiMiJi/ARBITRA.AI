import React, { useState } from 'react';
import Button from './common/Button';
import { UploadIcon } from './icons/Icons';

const TestimonialForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const inputClasses =
    "w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 disabled:opacity-50";
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSubmitted(false);
          setAvatarPreview(null);
        }, 500);
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase">Thank You!</h3>
        <p className="mt-4 text-brand-gray">Your testimonial has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isSubmitting} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="testimonial-name" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
              Full Name
            </label>
            <input type="text" id="testimonial-name" name="name" className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="testimonial-title" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
              Title / Role
            </label>
            <input type="text" id="testimonial-title" name="title" className={inputClasses} required />
          </div>
        </div>
        <div>
          <label htmlFor="testimonial-company" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
            Company
          </label>
          <input type="text" id="testimonial-company" name="company" className={inputClasses} required />
        </div>
        <div>
          <label htmlFor="testimonial-quote" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
            Your Testimonial
          </label>
          <textarea id="testimonial-quote" name="quote" rows={5} className={inputClasses} required placeholder="Share your experience with arbitra.ai..."></textarea>
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Avatar (Optional)</label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-16 w-16 bg-brand-dark flex items-center justify-center border-2 border-brand-gray/30 overflow-hidden rounded-full">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <svg className="h-10 w-10 text-brand-gray/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            <label htmlFor="avatar-upload" className="cursor-pointer bg-transparent text-brand-light font-medium py-2 px-4 border-2 border-brand-gray hover:border-brand-light hover:text-brand-light transition-colors duration-200 rounded">
              <span className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5" />
                Upload
              </span>
              <input
                id="avatar-upload"
                name="avatar"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
              />
            </label>
          </div>
        </div>
      </fieldset>
      <div className="mt-8 pt-6 border-t-2 border-brand-dark-accent text-right">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
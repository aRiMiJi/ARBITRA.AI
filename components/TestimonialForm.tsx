import React, { useState } from 'react';
import Button from './common/Button';
import { UploadIcon } from './icons/Icons';

const TestimonialForm: React.FC<{onClose: () => void}> = ({onClose}) => {
  const inputClasses = "w-full bg-slate-900/50 border border-slate-700 text-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition-colors duration-200";
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Close modal after a delay
      setTimeout(() => {
        onClose();
        // Reset state after the modal has closed
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
        <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-2xl font-bold text-slate-100">Thank You!</h3>
        <p className="mt-2 text-slate-400">Your testimonial has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
            <input type="text" id="name" name="name" className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">Title / Role</label>
            <input type="text" id="title" name="title" className={inputClasses} required />
          </div>
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">Company</label>
          <input type="text" id="company" name="company" className={inputClasses} required />
        </div>
        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-slate-400 mb-2">Your Testimonial</label>
          <textarea id="quote" name="quote" rows={5} className={inputClasses} required placeholder="Share your experience with arbitra.ai..."></textarea>
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Avatar (Optional)</label>
            <div className="mt-2 flex items-center gap-4">
                <span className="h-16 w-16 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                    ) : (
                        <svg className="h-10 w-10 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <label htmlFor="avatar-upload" className="cursor-pointer bg-slate-800 text-slate-300 font-medium py-2 px-4 border border-slate-700 hover:bg-slate-700 transition-colors duration-200">
                    <span className="flex items-center gap-2">
                        <UploadIcon className="h-5 w-5" />
                        Upload Image
                    </span>
                    <input id="avatar-upload" name="avatar" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
                </label>
            </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-800 text-right">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
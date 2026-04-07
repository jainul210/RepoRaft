'use client';

import { useState, useRef } from 'react';
import { createResource, updateResource } from '@/actions/resource';
import { useRouter } from 'next/navigation';
import { Link2, FileText, Layers, AlignLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Web Dev',
  'Data Structures',
  'Algorithms',
  'Machine Learning',
  'Physics',
  'Mathematics',
  'Database',
  'DevOps',
  'Mobile Dev',
  'System Design',
  'Other',
];

function Field({ label, icon: Icon, error, children }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-white/80">
        <Icon className="h-4 w-4 text-violet-400" />
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function SubmitForm({ initialData }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    setFieldErrors({});

    const formData = new FormData(formRef.current);
    let result;
    if (initialData?.id) {
      result = await updateResource(initialData.id, formData);
    } else {
      result = await createResource(formData);
    }

    if (result?.error) {
      setStatus('error');
      setErrorMsg(result.error);
    } else {
      setStatus('success');
      formRef.current?.reset();
      
      setTimeout(() => router.push('/'), 1000);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <Field label="Resource Title *" icon={FileText} error={fieldErrors.title}>
        <input
          type="text"
          name="title"
          placeholder="e.g., The Best React Tutorial for Beginners"
          defaultValue={initialData?.title || ''}
          required
          className={inputClass}
        />
      </Field>

      <Field label="URL / Link *" icon={Link2} error={fieldErrors.url}>
        <input
          type="url"
          name="url"
          placeholder="https://example.com/tutorial"
          defaultValue={initialData?.url || ''}
          required
          className={inputClass}
        />
      </Field>

      <Field label="Category *" icon={Layers} error={fieldErrors.category}>
        <select name="category" required className={`${inputClass} cursor-pointer`} defaultValue={initialData?.category || ''}>
          <option value="" disabled className="bg-zinc-900">
            Select a category...
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-zinc-900">
              {cat}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Short Description (optional)" icon={AlignLeft} error={fieldErrors.description}>
        <textarea
          name="description"
          placeholder="What makes this resource great? Who is it for?"
          defaultValue={initialData?.description || ''}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </Field>


      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          Resource {initialData ? 'updated' : 'shared'}! Redirecting to feed...
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {initialData ? 'Updating...' : 'Sharing...'}
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle className="h-4 w-4" />
            {initialData ? 'Updated!' : 'Shared!'}
          </>
        ) : (
          initialData ? 'Update Resource' : 'Share Resource'
        )}
      </button>
    </form>
  );
}

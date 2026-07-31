'use client';

import { useState, useRef } from 'react';
import { createResource, updateResource } from '@/actions/resource';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

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

const FIELD_ICONS = {
  title:       'title',
  url:         'link',
  category:    'category',
  description: 'notes',
};

function Field({ label, icon, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--on-surface)',
        letterSpacing: '0.01em',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>
          {icon}
        </span>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--error)' }}>
          <AlertCircle size={12} />
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

  const inputStyle = {
    width: '100%',
    borderRadius: '0.75rem',
    border: '1.5px solid var(--outline-variant)',
    background: 'var(--surface-container-low)',
    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.04)',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--on-surface)',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxSizing: 'border-box',
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Title */}
      <Field label="Resource Title *" icon={FIELD_ICONS.title} error={fieldErrors.title}>
        <input
          type="text"
          name="title"
          placeholder="e.g., The Best React Tutorial for Beginners"
          defaultValue={initialData?.title || ''}
          required
          style={inputStyle}
          onFocus={e => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04), 0 0 0 3px rgba(0,88,190,0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--outline-variant)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04)';
          }}
        />
      </Field>

      {/* URL */}
      <Field label="URL / Link *" icon={FIELD_ICONS.url} error={fieldErrors.url}>
        <input
          type="url"
          name="url"
          placeholder="https://example.com/tutorial"
          defaultValue={initialData?.url || ''}
          required
          style={inputStyle}
          onFocus={e => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04), 0 0 0 3px rgba(0,88,190,0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--outline-variant)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04)';
          }}
        />
      </Field>

      {/* Category */}
      <Field label="Category *" icon={FIELD_ICONS.category} error={fieldErrors.category}>
        <select
          name="category"
          required
          defaultValue={initialData?.category || ''}
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04), 0 0 0 3px rgba(0,88,190,0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--outline-variant)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04)';
          }}
        >
          <option value="" disabled style={{ color: 'var(--outline)' }}>
            Select a category...
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Field>

      {/* Description */}
      <Field label="Short Description (optional)" icon={FIELD_ICONS.description} error={fieldErrors.description}>
        <textarea
          name="description"
          placeholder="What makes this resource great? Who is it for?"
          defaultValue={initialData?.description || ''}
          rows={3}
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04), 0 0 0 3px rgba(0,88,190,0.1)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--outline-variant)';
            e.target.style.boxShadow = 'inset 2px 2px 6px rgba(0,0,0,0.04)';
          }}
        />
      </Field>

      {/* Alerts */}
      {status === 'error' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '0.75rem',
          border: '1px solid rgba(186,26,26,0.2)',
          background: 'rgba(186,26,26,0.06)',
          padding: '12px 16px',
          fontSize: '13px',
          color: 'var(--error)',
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          {errorMsg}
        </div>
      )}
      {status === 'success' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '0.75rem',
          border: '1px solid rgba(6,95,70,0.2)',
          background: 'rgba(6,95,70,0.06)',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#065f46',
        }}>
          <CheckCircle size={15} style={{ flexShrink: 0 }} />
          Resource {initialData ? 'updated' : 'shared'}! Redirecting to feed...
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="btn-primary"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '13px 24px',
          fontSize: '14px',
          opacity: (status === 'loading' || status === 'success') ? 0.7 : 1,
          cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            {initialData ? 'Updating...' : 'Sharing...'}
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle size={16} />
            {initialData ? 'Updated!' : 'Shared!'}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
            {initialData ? 'Update Resource' : 'Share Resource'}
          </>
        )}
      </button>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

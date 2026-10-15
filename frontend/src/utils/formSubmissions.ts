export interface FormSubmissionPayload {
  name: string;
  email?: string;
  phone?: string;
  formType: 'valuation' | 'consultation' | 'contact' | 'inquiry';
  service?: string;
  serviceArea?: string;
  details?: Record<string, any>;
  notes?: string;
}

export interface StoredSubmission extends FormSubmissionPayload {
  id: string;
  _id?: string;
  isRead: boolean;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'jamison_form_submissions';

export function getLocalSubmissions(): StoredSubmission[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read local submissions from storage', e);
  }
  return [];
}

export function saveLocalSubmissions(submissions: StoredSubmission[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.warn('Could not write local submissions to storage', e);
  }
}

export async function submitFormLead(payload: FormSubmissionPayload): Promise<{ success: boolean; submission?: StoredSubmission; error?: string }> {
  const localId = 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  const newSubmission: StoredSubmission = {
    id: localId,
    name: payload.name.trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    formType: payload.formType || 'inquiry',
    service: payload.service || 'General Inquiry',
    serviceArea: payload.serviceArea || 'Oklahoma City Metro',
    details: payload.details || {},
    notes: payload.notes || '',
    isRead: false,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately save to localStorage for zero-latency presentation in Admin Dashboard
  try {
    const currentList = getLocalSubmissions();
    currentList.unshift(newSubmission);
    saveLocalSubmissions(currentList);

    // Dispatch broadcast event for live reactive tabs
    window.dispatchEvent(new CustomEvent('jamison_form_submitted', { detail: newSubmission }));
  } catch (err) {
    console.warn('Local storage write note:', err);
  }

  // 2. Transmit to backend API
  try {
    const res = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSubmission),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.submission) {
        // Update local item with backend response ID if generated
        const updatedList = getLocalSubmissions().map((s) =>
          s.id === localId ? { ...s, ...data.submission } : s
        );
        saveLocalSubmissions(updatedList);
        return { success: true, submission: data.submission };
      }
    }
  } catch (apiErr: any) {
    console.warn('API submission deferred to local cache:', apiErr?.message);
  }

  return { success: true, submission: newSubmission };
}

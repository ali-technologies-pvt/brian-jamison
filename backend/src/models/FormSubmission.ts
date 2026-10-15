import mongoose, { Schema } from 'mongoose';

const FormSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    formType: {
      type: String,
      required: true,
      enum: ['valuation', 'consultation', 'contact', 'inquiry'],
      default: 'inquiry',
    },
    service: { type: String, default: 'General Inquiry' },
    serviceArea: { type: String, default: 'Oklahoma City Metro' },
    details: { type: Schema.Types.Mixed, default: {} },
    notes: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const FormSubmission: any =
  mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);

export default FormSubmission;

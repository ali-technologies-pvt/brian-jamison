import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteContent extends Document {
  key: string;
  content: string;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: {
      type: String,
      required: [true, 'Content key is required'],
      unique: true,
      index: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content text is required'],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

export default SiteContent;

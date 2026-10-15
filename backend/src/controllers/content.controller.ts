import { Request, Response } from 'express';
import { getSiteContent, updateSiteContent } from '../lib/contentStore';

export class ContentController {
  /**
   * GET /api/content
   */
  static async getContent(req: Request, res: Response) {
    try {
      const key = (req.query.key as string) || undefined;
      const data = await getSiteContent(key);
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Failed to get content:', error);
      return res.status(200).json({ success: true, content: {} });
    }
  }

  /**
   * POST /api/content/update
   */
  static async updateContent(req: Request, res: Response) {
    try {
      const { key, content } = req.body;

      if (!key || typeof content !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Both "key" and string "content" are required',
        });
      }

      const result = await updateSiteContent(key, content);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Failed to update content:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Failed to update content in database',
      });
    }
  }
}

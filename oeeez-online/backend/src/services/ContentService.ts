import { Content, IContent } from '../models/Content';

export class ContentService {
  static async createContent(contentData: Partial<IContent>): Promise<IContent> {
    const content = new Content(contentData);
    await content.save();
    return content;
  }

  static async getContentById(contentId: string): Promise<IContent | null> {
    return Content.findById(contentId).populate('author', 'username');
  }

  static async updateContent(contentId: string, userId: string, updateData: Partial<IContent>): Promise<IContent | null> {
    return Content.findOneAndUpdate(
      { _id: contentId, author: userId },
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username');
  }

  static async deleteContent(contentId: string, userId: string): Promise<boolean> {
    const result = await Content.findOneAndDelete({ _id: contentId, author: userId });
    return !!result;
  }

  static async getAllContents(): Promise<IContent[]> {
    return Content.find().populate('author', 'username');
  }
}

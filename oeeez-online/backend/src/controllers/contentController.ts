import { Request, Response } from 'express';
import { Content } from '../models/Content';

export const createContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body, type } = req.body;
    const content = new Content({
      title,
      body,
      type,
      author: req.user.id,
    });

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getContents = async (req: Request, res: Response): Promise<void> => {
  try {
    const contents = await Content.find().populate('author', 'username');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await Content.findById(req.params.id).populate('author', 'username');
    if (!content) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body, type } = req.body;
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, body, type },
      { new: true, runValidators: true }
    );

    if (!content) {
      res.status(404).json({ message: 'Content not found or unauthorized' });
      return;
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await Content.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!content) {
      res.status(404).json({ message: 'Content not found or unauthorized' });
      return;
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

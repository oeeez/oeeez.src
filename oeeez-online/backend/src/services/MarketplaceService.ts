import { Product, IProduct } from '../models/Product';

export class MarketplaceService {
  static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(productData);
    await product.save();
    return product;
  }

  static async getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId).populate('seller', 'username');
  }

  static async updateProduct(productId: string, userId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findOneAndUpdate(
      { _id: productId, seller: userId },
      updateData,
      { new: true, runValidators: true }
    ).populate('seller', 'username');
  }

  static async deleteProduct(productId: string, userId: string): Promise<boolean> {
    const result = await Product.findOneAndDelete({ _id: productId, seller: userId });
    return !!result;
  }

  static async getAllProducts(): Promise<IProduct[]> {
    return Product.find().populate('seller', 'username');
  }
}

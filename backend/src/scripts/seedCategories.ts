import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import Story from '../models/Story';

dotenv.config();

const categories = [
  {
    name: 'Klasik Masallar',
    description: 'Grimm Kardeşler ve diğer klasik masalcılardan sevilen hikayeler',
    icon: 'book-open-page-variant'
  },
  {
    name: 'Hayvan Masalları',
    description: 'Sevimli hayvanların başrolde olduğu eğlenceli hikayeler',
    icon: 'cat'
  },
  {
    name: 'Prenses Masalları',
    description: 'Prensesler, prensler ve sihirli krallıkların masalları',
    icon: 'crown'
  },
  {
    name: 'Macera Masalları',
    description: 'Heyecan dolu maceralar ve kahramanlık hikayeleri',
    icon: 'sword'
  },
  {
    name: 'Anadolu Masalları',
    description: 'Anadolu kültüründen gelen geleneksel masallar',
    icon: 'tea'
  },
  {
    name: 'Eğitici Masallar',
    description: 'Öğretici ve değerler eğitimi içeren masallar',
    icon: 'school'
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB\'ye bağlanıldı');
    
    // Mevcut kategorileri temizle
    await Category.deleteMany({});
    console.log('Mevcut kategoriler temizlendi');

    // Yeni kategorileri ekle
    const createdCategories = await Category.insertMany(categories);
    console.log('Kategoriler başarıyla eklendi:', createdCategories);

    // Örnek masalı güncelle
    const story = await Story.findOne({ title: 'Kırmızı Başlıklı Kız' });
    if (story) {
      const klasikKategori = createdCategories.find(c => c.name === 'Klasik Masallar');
      if (klasikKategori) {
        story.category = klasikKategori._id;
        await story.save();
        console.log('Örnek masal kategorisi güncellendi');
      }
    }

    console.log('Seed işlemi tamamlandı');
    process.exit(0);
  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error);
    process.exit(1);
  }
};

seedCategories(); 
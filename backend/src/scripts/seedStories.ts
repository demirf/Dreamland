import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from '../models/Story';
import Category from '../models/Category';

dotenv.config();

interface StoryInput {
  title: string;
  content: string;
  categoryName: string;
}

const stories: StoryInput[] = [
  {
    title: 'Kayıp Haritanın Peşinde',
    content: 'Denizci Ali, eski bir sandıkta gizemli bir harita buldu. Bu harita, bir adadaki gizli hazineye götürüyordu. Ali, cesur arkadaşı Efe’yle birlikte yola çıktı. Fırtınalarla, korsanlarla ve engellerle dolu bir macera yaşadılar. Sonunda haritadaki işaretlerin bir bilmece olduğunu fark ettiler ve çözerek hazinenin yerini buldular. Ama hazine bir sandık altın değil, adada yaşayan yoksul köylüler için bir tarım alanıydı. Ali ve Efe, köylülere yardım ederek adayı canlandırdılar.',
    categoryName: 'Macera Masalları'
  },
  {
    title: 'Bilge Çoban ve Deli Rüzgar',
    content: 'Bir zamanlar, Anadolu’nun bir köyünde bilge bir çoban yaşardı. Köyde sert rüzgarlar ekinlere zarar verirdi. Çoban, rüzgarla konuşmayı denedi ve ona neden böyle davrandığını sordu. Rüzgar, "Ben özgür olmak istiyorum," dedi. Çoban, rüzgara nehir kıyısındaki ağaçlara doğru esmesini önerdi. Böylece rüzgar özgürlüğünü yaşarken, köydeki ekinler de zarar görmedi. Köy halkı, çobanı ve onun bilge çözümünü yıllarca konuştu.',
    categoryName: 'Anadolu Masalları'
  },
  {
    title: 'Küçük Arı ve Büyük Fırtına',
    content: 'Bir arı yuvasında, Küçük Arı çalışkanlığıyla tanınırdı. Ama bir gün yuvasındaki diğer arılar, tembelliği tercih etmeye başladı. Fırtına çıktığında hazırlıksız olan arılar çok zor durumda kaldı. Sadece Küçük Arı’nın topladığı yiyecekler onları kurtardı. Tembel arılar dersini aldı ve bir daha asla işlerini aksatmadı. Çalışkanlık ve planlamanın ne kadar önemli olduğunu unutmadılar.',
    categoryName: 'Eğitici Masallar'
  },
  {
    title: 'Kumların Altındaki Gizem',
    content: 'Genç kaşifler Asya ve Can, çölde kaybolmuş bir tapınak hakkında efsane duydular. Tapınağı bulmak için yola çıktılar. Gündüz sıcağı ve gece soğuğuyla baş ederek, kumların altına gizlenmiş eski bir kapıyı keşfettiler. Kapıyı açtıklarında, içinde bir bilgenin yazıtlarını buldular: "Gerçek hazine, bilginin kendisidir." Yazıtlar sayesinde, tarihin ve doğanın önemini öğrenip dünyaya geri döndüler.',
    categoryName: 'Macera Masalları'
  },
  {
    title: 'Altın Buğday Taneleri',
    content: 'Anadolu’da bir köyde, kuraklık nedeniyle insanlar çok zor durumdaydı. Genç bir kız, bir gece rüyasında altın buğday taneleri eken bir kadını gördü. Ertesi gün, rüyasındaki yeri buldu ve birkaç buğday tanesi aldı. O taneleri köydeki tarlalara ekti. Kısa sürede buğdaylar yeşerdi ve köyün hayatı değişti. Herkes, rüyanın gerçek olmasına minnettar kaldı.',
    categoryName: 'Anadolu Masalları'
  },
  {
    title: 'Paylaşmanın Gücü',
    content: 'Küçük bir köyde, herkes yiyeceklerini saklardı. Kimse kimseyle bir şey paylaşmazdı. Bir gün, köye bir gezgin geldi. Herkesin kapısını çaldı ve elindeki boş bir çorba tenceresini gösterdi: "Çorbamı yapmak için sadece bir kaşık sebze gerek," dedi. Köy halkı şaşırdı ama sebzelerini paylaştı. Tencere doldu ve herkes çorbayı paylaştı. O günden sonra köyde paylaşmanın mutluluğu konuşulmaya başlandı.',
    categoryName: 'Eğitici Masallar'
  },
  {
    title: 'Gökyüzü Adasına Yolculuk',
    content: `Uzak bir köyde, gökyüzünde bir ada olduğu söylenirdi. Genç bir kaşif olan Deniz, bu efsanenin peşine düştü. Bir gün ormanda yaşlı bir bilgeyle karşılaştı. Bilge, ona gökyüzü adasına gitmek için üç görev verdi:

    1. Ormandaki sihirli kuşu bul ve ondan bir tüy al.
    2. Dağların zirvesindeki yıldız taşını getir.
    3. Deniz kıyısındaki dev deniz kabuğunu aç.

    Deniz, tüm bu görevleri tamamlayıp gökyüzü adasına ulaşmayı başardı. Adada, dünyayı iyilikle dolduran bir kaynak buldu ve köyüne dönerek bu iyiliği paylaştı.`,
    categoryName: 'Macera Masalları'
  },
  {
    title: 'Bereket Ağacı',
    content: 'Bir zamanlar, Anadolu’nun bir köyünde suyu azalan bir dere ve kuruyan tarlalar vardı. Köyde Yağmur adında genç bir kız, eski bir efsaneyi hatırladı: "Bereket Ağacı’nın tohumlarını bulan, köyünü kurtarır." Yağmur, bu tohumu bulmak için dağlara doğru yola çıktı.Dağlarda zor yollar, derin vadiler ve tehlikeli hayvanlarla karşılaştı ama hiç pes etmedi. Sonunda bir mağarada ağacın tohumlarını buldu. Tohumları köyüne getirdi ve köylülerle birlikte ekti. Kısa sürede tarlalar bereketle doldu, dere yeniden akmaya başladı. O günden sonra Yağmur, köyün kahramanı olarak anıldı ve ağacın gölgesinde mutlulukla yaşandı.',
    categoryName: 'Anadolu Masalları'
  },
  {
    title: 'Gizemli Şehir ve Altın Anahtar',
    content: 'Genç bir maceracı olan Arda, eski bir haritada gizli bir şehir işareti buldu. Şehir, yeraltında saklıydı ve efsaneye göre oraya yalnızca "Altın Anahtar" ile girilebilirdi. Arda, anahtarı bulmak için yola çıktı.Yolculuğunda dev kayalarla dolu vadileri geçti, tuzaklarla dolu bir mağarayı atlattı. Sonunda bir bilgeyle karşılaştı. Bilge ona, "Anahtar altın değil, iyiliktir," dedi. Arda, bilgenin sözünü anlayarak yolculuğunda karşılaştığı herkese yardım etmeye başladı. Yardımları sayesinde, yeraltı şehrinin kapıları kendiliğinden açıldı. Şehir, zenginlikten çok bilgiyle doluydu. Arda, bu bilgiyi dünyayla paylaşarak büyük bir kahraman oldu.',
    categoryName: 'Macera Masalları'
  },
  {
    title: 'Kayıp Dere ve Koca Kartal',
    content: 'Anadolu’nun bereketli topraklarında bir köy, bir zamanlar coşkuyla akan bir derenin kıyısında kurulmuştu. Ama bir gün dere kurudu ve köy halkı susuz kaldı. Köyün gençlerinden Meryem, derenin kaynağını bulmak için yola çıktı.Meryem, dağları aşarken yaralı bir kartal buldu. Kartalı iyileştirip serbest bıraktı. Kartal, minnettarlıkla ona eşlik etti. Meryem ve kartal, uzun bir yolculuktan sonra derenin kaynağını buldular. Meğer kaynağın önünü büyük bir taş kapatmış. Kartalın güçlü kanatlarıyla taş yerinden oynadı ve dere tekrar akmaya başladı. Köylüler, Meryem ve kartala teşekkür ederek dereye "Kartal Deresi" adını verdi.',
    categoryName: 'Anadolu Masalları'
  },
  {
    title: 'Altın Kanyon ve Gölgeler Ordusu',
    content: 'Bir köyde, Altın Kanyon hakkında bir efsane anlatılırdı. Efsaneye göre, kanyonda gizli bir hazine vardı ama hazineyi koruyan bir gölgeler ordusu da vardı. Maceraperest bir genç olan Selim, bu hazineyi bulmaya karar verdi.Kanyonun derinliklerine doğru ilerlerken tuzaklarla ve gölgelerle dolu bir yolculuk yaptı. Kanyonun sonunda dev bir kapıyla karşılaştı. Kapının üstünde şu yazıyordu: “Hazineyi yalnızca paylaşmayı bilen alabilir.” Selim, köyünden getirdiği azık torbasını gölgelerle paylaştı. Gölgeler, Selim’in cömertliğinden etkilenip yok oldu. Kapı açıldığında, Selim hazineyi köyüne götürdü ve köyün refah içinde yaşamasını sağladı.',
    categoryName: 'Macera Masalları'
  },
  {
    title: 'Çiçekler Diyarı ve Gönül Bahçesi',
    content: `Anadolu’nun yüksek tepelerinde, sadece masallarda anlatılan Çiçekler Diyarı bulunurdu. Bu diyar, sonsuz renkte çiçeklerle doluymuş ama diyarın kapılarını açmak için saf bir kalbe ihtiyaç varmış.

    Küçük bir kız olan Zehra, bu diyara ulaşmak için yola çıktı. Yolda, yaralı bir ceylanla karşılaştı ve ona yardım etti. Daha sonra yuvasını kaybetmiş bir yavru kuşu korudu. Son olarak, yaşlı bir kadının yükünü taşımasına yardım etti.

    Zehra, Çiçekler Diyarı’nın kapısına ulaştığında, kapılar kendiliğinden açıldı. Meğer diyar, yardımseverlik ve iyilikle dolu bir kalbi ödüllendirirmiş. Zehra’nın sayesinde diyarın çiçekleri köye yayıldı ve tüm köy güzellik içinde yaşamaya başladı.`,
    categoryName: 'Anadolu Masalları'
  },
];

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} dakika`;
};

const generatePreview = (content: string): string => {
  const words = content.split(/\s+/).slice(0, 30).join(' ');
  return words + (content.split(/\s+/).length > 30 ? '...' : '');
};

const seedStories = async () => {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dreamland');
    console.log('MongoDB bağlantısı başarılı');

    // Kategorileri getir
    const categories = await Category.find();
    const categoryMap = new Map(categories.map(cat => [cat.name, cat._id]));

    // Her hikaye için
    for (const story of stories) {
      const categoryId = categoryMap.get(story.categoryName);
      if (!categoryId) {
        console.error(`Kategori bulunamadı: ${story.categoryName}`);
        continue;
      }

      // Hikayeyi oluştur
      const newStory = new Story({
        title: story.title,
        content: story.content,
        readingTime: calculateReadingTime(story.content),
        preview: generatePreview(story.content),
        category: categoryId
      });

      // Kaydet
      await newStory.save();
      console.log(`Hikaye eklendi: ${story.title}`);
    }

    console.log('Tüm hikayeler başarıyla eklendi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
  }
};

// Script'i çalıştır
seedStories(); 
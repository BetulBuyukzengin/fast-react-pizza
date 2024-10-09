# 🍕Fast React Pizza 
## Canlı versiyon : <a href="https://main--fast-pizza-app-bb.netlify.app/">Fast Pizza</a>
- Kullanıcıların menüden bir veya daha fazla pizza sipariş edebileceği bir web uygulamasıdır.

## 📝Proje Özellikleri:

- Kullanıcı hesabı ve oturum açma işlemi gerektirmez. Kullanıcılar, uygulamayı kullanmadan önce sadece isimlerini girmeliler.
- Menü içeriği bir api den gelmektedir.
- Sipariş için kullanıcılar, sepete birden fazla pizza ekleyebilir.
- Siparişi verebilmeleri için kullanıcıların adı, adresi ve telefon numaraları gereklidir.
- Teslimatı kolaylaştırmak için GPS konumu kullanılmaktadır.
- Kullanıcı teslimatını öncelikli olarak işaretlemek isterse, sepet fiyatının %20 sini ek ücret olarak ödemelidir.
- Kullanıcı siparişini verdikten sonra da öncelikli olarak işaretleme yapabilmelidir.
- Siparişler, sipariş verilerini (kullanıcı verileri + seçilen pizzalar) içeren bir POST isteğinin API'ye gönderilmesiyle gerçekleştirilir.
- Ödemeler teslimatta yapılır, dolayısıyla uygulamada herhangi bir ödeme işlemi yoktur.
- Kullanıcının siparişi oluşturulduğunda, her siparişe ait bir id oluşturulur ve bu id ile sipariş hakkında bilgi alınabilir.

# 🛠Kullanılan Teknolojiler:

- React JS
- Router
- Tailwind Css
- Redux

## Router: <a href="https://reactrouter.com/en/main"> Router doküman </a>

### Router nasıl oluşturulur ? :

- Router oluşturmak için öncelikle `npm i react-router-dom@latest` ile kurulum yapmalıyız.
- App componentimizde createBrowserRouter fonksiyonunu react router dom dan import ettikten sonra route ları oluşturuyoruz.
  - Fonksiyonun içinde objeler dizimizde yönlendirmeyi yaparken *path* ile *element* özelliklerini kullanıyoruz.
    Path yolu belirtirken, element de componentimize işaret ediyor.
  - İç içe route oluşturmak için children kullanıyoruz. Ve bu child route ları göstermek için `<Outlet/>` componentini import ederek kullanıyoruz.
- RouterProvider a, oluşturduğumuz _createBrowserRouter_ fonksiyonunu prop olarak veriyoruz.

### Loader:

- Sadece o sayfaya gidildiğinde data fetch yapmamızı sağlayan bir yapıdır.
- Bu yapı useEffect'te olduğu gibi ( önce component renderlanması ve sonra veri yakalanması ) değil, component renderlanması ve veri yakalanması aynı anda yapılmakta.
- 3 adımda gerçekleşecek:
  - İlk olarak Api den veri almak için bu işlevi yerine getirecek bir fonksiyon oluşturuyoruz.
  - Daha sonra bu loader fonksiyonunu, route lardan birine sağlıyoruz (provide). (Bu route daha sonra verileri getirme görevini yapacak)
  - Sonuncusu ise veriyi almak. Bunun için _useLoaderData()_ fonksiyonunu import ederek veriyi alıyoruz hatta herhangi bir prop, parametre vermemize gerek kalmadan. Otomatik olarak buluyor ve verileri getiriyor.
- Artık yeni react router, sadece bileşeni URL ile eşleştirmeden sorumlu değil; her sayfa için componenti renderlarken aynı zamanda verileri de getirmeyi sağlıyor.
- Veri yüklenirken Loader componentini göstermek için _useNavigation()_ hook unu kullandım. Kullanıldığı sayfanın state ine göre kondisyonel olarak component gösterilmiş oldu.
- Hata göstermek için ana route içerisinde _errorElement_ özelliği kullandım ve buna `<Error />` componentini verdim.
- Oluşan hatayı almak için Error componenti içerisinde _useRouteError()_ hook unu kullandım.
- Kullanıcı, inputa aramak istediği siparişi girdiğinde o siparişe ait detayların bulunduğu sayfaya yönlendirilmesi için _useNavigate()_ kullandım.

### Action:

- Veri yazmak veya sunucudaki verileri değiştirmek için react router action ı nasıl güncelleriz?
- Yeni sipariş oluşturmak için CreateOrder da veri manipülasyonunu react router ın _Form_ bileşeni ile yaptım, methodunu da _POST_ olarak tanımladım. Burada action kullanmama gerek kalmıyor çünkü react router otomatik olarak buluyor.
- Veri almak için asenkron bir fonksiyon oluşturdum ve burada form verilerini almak için _formData()_ kullandım.
- Api dosyamdan createOrder asenkron fonksiyonunu çağırarak _redirect(`/order/${newOrder.id}`)_ ile yönlendirme yaptım. navigate kullanmadım çünkü fonksiyon içerisinde kullanamayız.
- `<input type="hidden" name="cart" value={JSON.stringify(cart)} />`: Kullanıcının alışveriş sepeti bilgilerini içeren bir JSON dizesinin sunucuya iletilmesi amacıyla kullanılır.
- _useNavigation()_ kullanarak "order now" butonuna loading özelliği ekledim. Yükleme esnasında buton da desabled olacak.

### Error Handling

- _useActionData()_ hookunun en yaygın kullanılan durumu, form doğrulama hatalarıdır.
- Sipariş ekleme formunda girilen telefon numarasının format kontrolünü yaparken bu hooku kullandım.
- Öncelikle boş bir errors adlı objeyi oluşturdum ve telefon numarası formatının girilen numarayla uyumlu olup olmadığını kontrol ettim. Eğer uyumlu değil ise objenin içerisine hata mesajı ile ekledim. Objede en az 1 hata var ise hata döndürülecek.
- _useActionData()_ yı atadığım değişkeni jsx içerisinde hatayı göstermek için kullandım.

---

## Tailwind Css

- İçerisinde yararlı sınıflar bulunduran (flex,text-align vb.) html veya jsx ile oluşturduğumuz tasarımları şekillendirmek için kullanılan css frameworküdür.
- | AVANTAJLARI                                                      | DEZAVANTAJLARI                                    |
  | ---------------------------------------------------------------- | ------------------------------------------------- |
  | Classlara isim vermek için endişelenmeye gerek kalmaz            | Çok sayıda sınıf olduğu için okunaksız görünmekte |
  | İşaretleme ve stilleme yaparken sayfalar arası geçmeye gerek yok | Öğrenmeniz gereken çok fazla sınıf adı var        |
  | Anlaşılması ve kullanılması kolay                                | Her yeni projede Tailwind CSS kurmak gerekiyor    |
  | Güzel bir tasarım sistemine sahip                                | Vanilla CSS'den vazgeçilebiliyor                  |
  | Responsive konusunda zaman tasarrufu sağlar                      | -                                                 |
  | Doküman ve VS Code entegrasyonu mükemmeldir                      | -                                                 |

- `npm install -D tailwindcss postcss autoprefixer` & `npx tailwindcss init -p` ile kurulum yapılır.
- tailwind.config dosyasına ve index.css dosyasına gerekli eklemeler yapıldıktan sonra işlem tamamlanır.<a href="https://tailwindcss.com/docs/installation">Detaylı bilgi</a>
- Tailwind CSS IntelliSense eklentisini vs code kurarak sınıf adlarını yazmada işimiz daha da kolaylaşır.
- `npm install -D prettier prettier-plugin-tailwindcss` ile sınıfları önerilen sınıf sırasına göre otomatik olarak sıralayacaktır. Ardından eklentiyi prettier a ekleyelim.`// prettier.config.cjs
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true, //  ' ' instead of " "
}`

## Redux

- Kullanıcı durumuna birçok yerde ihtiyacımız var dolayısıyla globalde kontrol etmek için _redux toolkit_ kullandım.
- `npm i @reduxjs/toolkit react redux` ile kurulumu tamamladım.
- İçerisinde initialState ve reducer ın bulunduğu bir userSlice.js ve cartSlice.js dosyası oluşturdum. Ardından redux store u oluşturmak ve tüm reducerları bir arada toplamak için store.js dosyasını oluşturdum.
- Ve bu dosyayı react projeme bağlamak için main.jsx de componentleri _provider_ a sararak store propunu verdim.

### Kullandığım, redux toolkit tarafından sağlanan özel action türleri:

- Bu özel action türleri, Redux Toolkit'in createAsyncThunk fonksiyonu ile birlikte kullanılarak otomatik olarak oluşturulabilir.
- Genellikle Redux ile asenkron işlemleri yönetmek için kullanılır.
  - _pending :_ Bir asenkron işlemin başladığını belirtmek için kullanılır.
  - _fulfilled_ : Bir asenkron işlemin başarıyla tamamlandığını belirtmek için kullanılır.
  - _rejected_ : Bir asenkron işlemin başarısız olduğunu belirtmek için kullanılır.

## useFetcher():

- Menu route daki verileri navigation olmadan yani oraya gitmeden kullanmak için useFetcher() fonksiyonundan faydalandım. (Order.jsx)
  `  const fetcher = useFetcher();
useEffect(
  function () {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  },
  [fetcher],
);`
- Order ı güncellemek için fetch.loader yerine forma sardım.
  `function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>;
    </fetcher.Form>
  );
}`   

![React-use-Pop-Corn](public/fast-react-pizza.gif)

# Fast React Pizza

- Kullanıcıların menüden bir veya daha fazla pizza sipariş edebileceği basit bir uygulama.

## Proje Özellikleri:

- Kullanıcı hesabı ve oturum açma işlemi gerektirmez. Kullanıcılar, uygulamayı kullanmadan önce sadece isimlerini girmeliler.
- Menü içeriği bir api den gelmektedir.
- Sipariş için kullanıcılar, sepete birden fazla pizza ekleyebilir.
- Siparişi verebilmeleri için kullanıcı adı, adresi ve telefon numaraları gereklidir.
- Mümkünse teslimatı kolaylaştırmak için GPS konumu kullanılmalıdır.
- Kullanıcı teslimatını öncelikli olarak işaretlemek isterse, sepet fiyatının %20 sini ek ücret olarak ödemelidir.
- Kullanıcı siparişini verdikten sonra da öncelikli olarak işaretleme yapabilmelidir.
- Siparişler, sipariş verilerini (kullanıcı verileri + seçilen pizzalar) içeren bir POST isteğinin API'ye gönderilmesiyle gerçekleştirilir.
- Ödemeler teslimatta yapılır, dolayısıyla uygulamada herhangi bir ödeme işlemine gerek yoktur.
- Kullanıcı sonradan siparişini arayıp, incelemek istediğinde her sipariş kendine ait benzersiz bi id almalıdır.

# Kullanılan Teknolojiler:

- React JS
- Router
- Tailwind Css

## Router: <a href="https://reactrouter.com/en/main"> Router doküman </a>

### Create:

- Projemde router ın son versiyonunu kullandım.
- Router oluşturmak için öncelikle `npm i react-router-dom@latest` ile kurulum yapmalıyız.
- App componentimizde createBrowserRouter fonksiyonunu react router dom dan import ettikten sonra route ları oluşturuyoruz.
  - Fonksiyonun içinde objeler dizimizde yönlendirmeyi yaparken path ile element kullanıyoruz.
    Path yolu belirtirken, element de componentimize işaret ediyor.
  - İç içe route oluşturmak için children kullanıyoruz. Ve bu child route ları göstermek için <Outlet/> componentini import ederek kullanıyoruz.
- RouterProvider a oluşturduğumuz createBrowserRouter fonksiyonunu prop olarak veriyoruz.

### Loader:

- Sadece o sayfaya gidildiğinde data fetch yapmamızı sağlayan bir yapıdır.
- Bu yapı useEffect'te olduğu gibi ( önce component renderlanması ve sonra veri yakalanması ) değil, component renderlanması ve veri yakalanması aynı anda yapılıyor.
- 3 adımda gerçekleşecek:
  - İlk olarak Api den veri almak için bu işlevi yerine getirecek bir fonksiyon oluşturuyoruz.
  - Daha sonra bu loader fonksiyonunu, route lardan birine sağlıyoruz(provide) ve bu route daha sonra verileri getirme görevini yapacak.
  - Sonuncusu veriyi almak. Bunun için useLoaderData() fonksiyonunu import ederek veriyi alıyoruz hatta herhani bir prop, parametre vermemize gerek kalmadan. Otomatik bir şekilde buluyor ve verileri getiriyor.
- Artık yeni react router, sadece bileşeni URL ile eşleştirmeden sorumlu değil; her sayfa için componenti renderlarken aynı zamanda verileri de getirmeyi sağlıyor.
- Veri yüklenirken Loader componentini göstermek için useNavigation() hook unu kullandım. Kullanıldığı sayfanın state ine göre kondisyonel olarak component gösterildi.
- Hata göstermek için ana route içerisinde errorElement özelliği kullandım ve buna <Error /> componentini verdim.
- Oluşan hatayı almak için Error componenti içerisinde useRouteError() hook unu kullandım.

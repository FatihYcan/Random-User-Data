document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Rest ülkeleri API'sine bir istek yap
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    // Her ülkeyi adı ve verileriyle eşleştiren bir dizi oluştur
    const countryData = countries.map((country) => {
      return {
        name: country.name.common,
        data: country,
      };
    });

    // Sayfa açıldığında rastgele bir ülke seç ve bilgilerini göster
    const randomCountry =
      countryData[Math.floor(Math.random() * countryData.length)];
    displayCountryInfo(randomCountry.data);

    // Arama kutusuna her girişte çalışacak olan olay dinleyicisi
    const searchInput = document.getElementById("search");
    const searchDiv = document.getElementById("searchDiv");

    searchInput.addEventListener("input", function () {
      // Arama kutusuna girilen değeri küçük harfe çevir
      const inputValue = searchInput.value.toLowerCase();
      // Girişe uyan ülkeleri filtrele
      const matchingCountries = countryData.filter((country) =>
        country.name.toLowerCase().includes(inputValue)
      );

      // Arama sonuçlarını gösteren div'i temizle
      searchDiv.innerHTML = "";

      // Her bir eşleşen ülkeyi gösteren bir div oluştur
      matchingCountries.forEach((country) => {
        const countryDiv = document.createElement("span");
        countryDiv.textContent = country.name;
        countryDiv.classList.add("list");

        // Ülkeye tıklanınca bu ülkenin bilgilerini göster ve arama sonuçlarını temizle
        countryDiv.addEventListener("click", function () {
          displayCountryInfo(country.data);
          searchDiv.innerHTML = "";
          searchInput.value = ""
        });

        // Div'i arama sonuçlarına ekle
        searchDiv.appendChild(countryDiv);
      });
    });
  } catch (error) {
    // Hata durumunda konsola hata mesajını yazdır
    console.error("Veri alınırken hata oluştu:", error);
  }
});

// Seçilen ülkenin bilgilerini gösteren fonksiyon
function displayCountryInfo(countryInfo) {
  // Bayrak resmini göster
  document.getElementById("image").src = countryInfo.flags.png;

  // Ülke adını göster
  document.getElementById("name").textContent = countryInfo.name.common;

  // Bölge bilgisini göster
  document.getElementById("region").textContent = countryInfo.region;

  // Başkent bilgisini göster
  document.getElementById("capital").textContent = countryInfo.capital;

  // Dil bilgisini göster
  document.getElementById("langueage").textContent = Object.values(
    countryInfo.languages
  ).join(", ");

  // Para birimi bilgisini göster
  document.getElementById("money").textContent = Object.values(
    countryInfo.currencies
  )
    .map((currencies) => `${currencies.name}, ${currencies.symbol} `)
    .join(", ");

  // Nüfus bilgisini göster
  document.getElementById("population").textContent =
    countryInfo.population.toLocaleString();

  // Sınırlar bilgisini göster
  document.getElementById("border").textContent = countryInfo.borders
    ? countryInfo.borders.join(", ")
    : "Yok";

  // Google Haritalar linkini oluştur ve bağlantıyı güncelle
  document.getElementById("map").href = countryInfo.maps.googleMaps;
}

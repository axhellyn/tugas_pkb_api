const API_URL = "http://spidah.my.id/dimana.php";

const fetchLocation = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (json.status === "OK") {
      return json;
    } else {
      throw new Error("API status tidak OK");
    }
  } catch (e: any) {
    return { error: e.message || "Terjadi kesalahan tak terduga" };
  }
};

export default fetchLocation;

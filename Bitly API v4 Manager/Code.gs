/**
 * BITLY API V4 WRAPPERS - SPY-E PREMIUM ENGINE
 * Author: Rolandino
 */

var BitlyApp = (function() {
  
  // Konfigurasi Internal
  const BASE_URL = 'https://api-ssl.bitly.com/v4';
  
  const Utils = {
    /**
     * Mendapatkan property dengan sistem Cache-First
     */
    getProp: function(key) {
      const cache = CacheService.getUserCache();
      let value = cache.get(key);
      if (!value) {
        value = PropertiesService.getUserProperties().getProperty(key);
        if (value) cache.put(key, value, 21600); // Simpan 6 jam
      }
      return value;
    },

    /**
     * Menyimpan property dan membersihkan cache lama
     */
    setProp: function(key, value) {
      CacheService.getUserCache().remove(key);
      PropertiesService.getUserProperties().setProperty(key, value);
    },

    /**
     * Core Fetch Engine dengan Error Handling
     */
    request: function(endpoint, options = {}) {
      const token = this.getProp('BITLY_TOKEN');
      if (!token) throw new Error("API Token belum diatur. Gunakan BitlyApp.setCredentials(token, guid)");

      const url = BASE_URL + endpoint;
      const fetchOptions = {
        method: options.method || 'GET',
        contentType: 'application/json',
        muteHttpExceptions: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      if (options.payload) fetchOptions.payload = JSON.stringify(options.payload);

      const response = UrlFetchApp.fetch(url, fetchOptions);
      const resText = response.getContentText();
      const resJson = JSON.parse(resText);

      if (response.getResponseCode() >= 400) {
        throw new Error(`Bitly Error: ${resJson.message || 'Unknown Error'} - ${resJson.description || ''}`);
      }

      return resJson;
    }
  };

  return {
    /**
     * SETUP: Jalankan ini sekali untuk konfigurasi awal
     */
    setCredentials: function(token, guid) {
      Utils.setProp('BITLY_TOKEN', token);
      Utils.setProp('BITLY_GUID', guid);
      return "Kredensial berhasil disimpan!";
    },

    /**
     * URL MODULE: Mempersingkat link
     */
    Shorten: {
      insert: function(longUrl) {
        const guid = Utils.getProp('BITLY_GUID');
        const payload = {
          "long_url": longUrl,
          "group_guid": guid || undefined // Opsional tergantung akun
        };
        
        const r = Utils.request('/shorten', { method: 'POST', payload: payload });
        return {
          id: r.link,
          long_url: r.long_url,
          created_at: r.created_at
        };
      }
    },

    /**
     * GROUPS MODULE: Mengambil info group/GUID
     */
    Groups: {
      list: function() {
        return Utils.request('/groups');
      }
    }
  };
})();

/**
 * CONTOH PENGGUNAAN (TESTING)
 */
function testBitly() {
  // 1. Setup (Hanya perlu sekali)
  // BitlyApp.setCredentials("TOKEN_ANDA", "GUID_ANDA");

  // 2. Shorten URL
  try {
    const result = BitlyApp.Shorten.insert("https://google.com");
    Logger.log("Short Link: " + result.id);
  } catch (e) {
    Logger.log("Gagal: " + e.message);
  }
}

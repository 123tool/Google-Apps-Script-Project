function buatAkunMassal(dataAkun) {
  // dataAkun adalah array JSON berisi nama, email, password
  let statistik = { sukses: 0, gagal: 0, log: [] };
  
  dataAkun.forEach(akun => {
    let userObj = {
      primaryEmail: akun.email,
      name: {
        givenName: akun.namaDepan,
        familyName: akun.namaBelakang
      },
      password: akun.password,
      changePasswordAtNextLogin: true // Keamanan tambahan
    };
    
    try {
      // Membuat user secara resmi tanpa bypass/anti-deteksi
      let userBaru = AdminDirectory.Users.insert(userObj);
      statistik.sukses++;
      statistik.log.push({ email: userBaru.primaryEmail, status: "Sukses", waktu: new Date() });
    } catch (e) {
      statistik.gagal++;
      statistik.log.push({ email: akun.email, status: "Error", pesan: e.message });
    }
  });
  
  // Simpan log ke Google Drive sebagai file JSON
  simpanLogKeDrive(statistik);
  return statistik;
}

function simpanLogKeDrive(data) {
  let folder = DriveApp.getRootFolder(); // Bisa disesuaikan ke ID folder spesifik
  let namaFile = "123Tool_Log_" + new Date().getTime() + ".json";
  folder.createFile(namaFile, JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
}

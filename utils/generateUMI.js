function generateUMI() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const umiLength = 10; // You can adjust the length based on your preference
  
    let umi = '';
    for (let i = 0; i < umiLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      umi += characters.charAt(randomIndex);
    }
  
    return umi;
  }
  
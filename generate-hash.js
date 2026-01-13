const bcrypt = require('bcryptjs');

// Génération du hash pour "Admin@123"
const password = 'Admin@123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Erreur:', err);
    return;
  }
  console.log('\n✅ Hash bcrypt généré pour "Admin@123":\n');
  console.log(hash);
  console.log('\n📋 Utilisez ce hash dans votre fichier database.sql\n');
  
  // Vérification
  bcrypt.compare(password, hash, function(err, result) {
    if (result) {
      console.log('✅ Hash vérifié avec succès!\n');
    }
  });
});

import { WhoisJson } from '../src';

// Initialisation du client avec votre clé API
const client = new WhoisJson({
  apiKey: ''
});

// Fonction qui teste tous les endpoints
async function testAllEndpoints(domain: string) {
  console.log(`\n🔍 Analyse du domaine: ${domain}\n`);

  try {
    // Test WHOIS
    console.log('📋 Informations WHOIS:');
    const whoisInfo = await client.lookup(domain);
    console.log(JSON.stringify(whoisInfo, null, 2));
    console.log('\n' + '-'.repeat(50) + '\n');

    // Test NSLookup
    console.log('🌐 Informations DNS:');
    const dnsInfo = await client.nslookup(domain);
    console.log(JSON.stringify(dnsInfo, null, 2));
    console.log('\n' + '-'.repeat(50) + '\n');

    // Test SSL
    console.log('🔒 Informations SSL:');
    const sslInfo = await client.ssl(domain);
    console.log(JSON.stringify(sslInfo, null, 2));

  } catch (error) {
    console.error('❌ Erreur:', error instanceof Error ? error.message : error);
  }
}

// Test avec quelques domaines populaires
const domains = [
  'google.com',
  'github.com',
  'npmjs.com'
];

// Exécution des tests pour chaque domaine
domains.forEach((domain, index) => {
  setTimeout(() => {
    testAllEndpoints(domain);
  }, index * 2000); // Délai de 2 secondes entre chaque domaine pour éviter de surcharger l'API
}); 
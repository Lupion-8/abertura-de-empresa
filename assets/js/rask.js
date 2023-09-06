let rastreio = {
  latitude_cliente: "",
  longitude_cliente: "",
  cidade_cliente: "",
  estado_cliente: "",
  pais_cliente: "",
  pais_provedor: "",
  cidade_provedor: "",
  estado_provedor: "",
  type_link: isCampaignTraffic(),

  system_infortions: {
    navegador: "",
    numCores: "",
    tela:"",
    nome_dispositivo:""
  }
}

function getQueryParams(url) {
  var queryParams = {};
  var params = url.slice(url.indexOf('?') + 1).split('&');

  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    var key = decodeURIComponent(param[0]);
    var value = decodeURIComponent(param[1]);
    queryParams[key] = value;
  }

  return queryParams;
}

// Função para verificar se a página foi acessada por um link de campanha
function isCampaignTraffic() {
  var queryParams = getQueryParams(window.location.search);

  // Verifique se os parâmetros de UTM estão presentes
  if (
    queryParams.hasOwnProperty('utm_source') &&
    queryParams.hasOwnProperty('utm_medium') &&
    queryParams.hasOwnProperty('utm_campaign')
  ) {
    return true; // A página foi acessada por um link de campanha
  }
  // Verifique se os parâmetros de gclid do google ads estão presentes
  if (queryParams.hasOwnProperty('gclid')) {
    return ' link de campanha, google ADS'; // A página foi acessada por um link de campanha
  }

  return 'link orgânico.'; // A página foi acessada por um link orgânico
}

//obter localização por longetudade latitude
async function getLocationInfo(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // A resposta JSON conterá informações de localização
    rastreio.cidade_cliente = data.address.city;
    rastreio.estado_cliente = data.address.state;
    rastreio.pais_cliente = data.address.country;
  } catch (error) {
    console.error("Erro ao obter informações de localização: " + error);
  }
}


// Verificar se o navegador suporta a API Geolocation
if ("geolocation" in navigator) {
  // Obter a localização do usuário
  navigator.geolocation.getCurrentPosition(function (position) {
    // A função de sucesso é chamada quando a localização é obtida
    rastreio.latitude_cliente = position.coords.latitude;
    rastreio.longitude_cliente = position.coords.longitude;
    getLocationInfo(position.coords.latitude, position.coords.longitude);

  }, function (error) {
    // A função de erro é chamada se ocorrer um erro ao obter a localização
    console.error("Erro ao obter a localização: " + error.message);
  });
} else {
  console.log("Geolocalização não suportada pelo navegador.");
}


// obter a localização do provedordor
fetch('http://ip-api.com/json')
  .then(response => response.json())
  .then(data => {
    rastreio.cidade_provedor = data.city;
    rastreio.estado_provedor = data.regionName;
    rastreio.pais_provedor = data.country;
  })
  .catch(error => {
    console.error("Erro ao obter informações de geolocalização: " + error);
  });



if (navigator) {
  rastreio.system_infortions.numCores = navigator.hardwareConcurrency;
  rastreio.system_infortions.navegador = navigator.appVersion;
  rastreio.system_infortions.ram_memory = navigator.deviceMemory;
  rastreio.system_infortions.tela =  window.innerWidth +" X "+ window.innerHeight

  const userAgent = navigator.userAgent;
// Verifica se o agente do usuário contém palavras-chave comuns de dispositivos
if (userAgent.match(/Android/i)) {
  // Se for um dispositivo Android, pode tentar extrair o nome/modelo do dispositivo
  const match = userAgent.match(/Android\s([^\s]+)/i);
  if (match) {
    const androidDeviceName = match[1];
    rastreio.system_infortions.nome_dispositivo = "Nome do dispositivo Android: " + androidDeviceName;
  }
} else if (userAgent.match(/iPhone|iPad|iPod/i)) {
  // Se for um dispositivo iOS, pode tentar extrair o nome/modelo do dispositivo
  const match = userAgent.match(/iPhone\sOS\s([\d_]+)/i);
  if (match) {
    const iOSDeviceName = match[1].replace(/_/g, '.');
    rastreio.system_infortions.nome_dispositivo ="Nome do dispositivo iOS: " + iOSDeviceName;
  }
} else {
  // Se não corresponder a dispositivos conhecidos, imprima o agente do usuário completo
  rastreio.system_infortions.nome_dispositivo = userAgent;
}

} else {
  console.log("none");
}

console.log(rastreio)
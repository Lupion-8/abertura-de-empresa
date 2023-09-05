// Função para obter os parâmetros da URL
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

    if (queryParams.hasOwnProperty('gclid') 
    ) {
        return true; // A página foi acessada por um link de campanha
    }
    
    return false; // A página foi acessada por um link orgânico
}

// Exemplo de uso
if (isCampaignTraffic()) {
    console.log('A página foi acessada por um link de campanha.');
} else {
    console.log('A página foi acessada por um link orgânico.');
}
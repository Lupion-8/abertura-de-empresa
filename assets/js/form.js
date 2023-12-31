async function formController(e) {
    await fetch("https://controllercontadores.com.br/controller/forms", {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(e)
    }).then((e=>e.json())).then((e=>{
        "err" == e.data || (document.querySelector(".elementor-form").innerHTML = `<div class="elementor-message elementor-message-danger" role="alert">${e.msg}</div>`)
    }
    )).catch((function(e) {}
    ))
}
let ip;
$.getJSON("https://api.ipify.org?format=jsonp&callback=?", (function(e) {
    let t = JSON.stringify(e, null, 2);
    ip = JSON.parse(t).ip
}
)),
document.querySelector(".envi").addEventListener("click", (async e=>{
    const t = new Intl.DateTimeFormat("pt-BR")
      , o = new Date
      , n = o.getHours()
      , r = o.getMinutes()
      , a = document.querySelector(".nn").value
      , l = document.querySelector(".tt").value
      , i = document.querySelector(".ee").value
      , s = t.format(o)
      , c = n + ":" + r;
    let m = Math.random().toString(36).substr(-4).toUpperCase()
      , d = Math.floor(8999 * Math.random() + 1e3);
    if (a.length >= 2)
        if (l.length >= 11)
            if (-1 != i.indexOf("@")) {
                const e = {
                    nome: a,
                    telefone: l,
                    email: i,
                    data: s,
                    hora: c,
                    ip: ip,
                    status: "novo",
                    pagina: "landing 2",
                    id: `${m}-${d}`,
                    origen:"formulario",
                    page:'Abertura de empresa',
                    rastreio
                };
                formController(await e)
            } else
                alert("E-mail inválido");
        else
            alert("Número inválido");
    else
        alert("Nome inválido")
}
));

document.querySelector(".envi_pop").addEventListener("click", (async e=>{
    const t = new Intl.DateTimeFormat("pt-BR")
      , o = new Date
      , n = o.getHours()
      , r = o.getMinutes()
      , a = document.querySelector(".abertura_de_empresa_pop .nameTelefone .nn").value
      , l = document.querySelector('.code').textContent +' '+ document.querySelector(".abertura_de_empresa_pop .nameTelefone .tt").value
      , i = document.querySelector(".abertura_de_empresa_pop .mail .ee").value
      , s = t.format(o)
      , c = n + ":" + r;
    let m = Math.random().toString(36).substr(-4).toUpperCase()
      , d = Math.floor(8999 * Math.random() + 1e3);
    if (a.length >= 2)
        if (l.length >= 11)
            if (-1 != i.indexOf("@")) {
                const e = {
                    nome: a,
                    telefone: l,
                    email: i,
                    data: s,
                    hora: c,
                    ip: ip,
                    status: "novo",
                    pagina: "landing 2",
                    id: `${m}-${d}`,
                    origen:"pop-up",
                    page:'Abertura de empresa',
                    rastreio
                };
                formController(await e)
            } else
                alert("E-mail inválido");
        else
            alert("Número inválido");
    else
        alert("Nome inválido")
}
));

var quartos = [];
var quartosFilter = [];
var cidades = [
  { nome: "São Paulo", uf: "SP", lat: -23.5329, lng: -46.6395 },
  { nome: "Rio de Janeiro", uf: "RJ", lat: -22.9129, lng: -43.2003 },
  { nome: "Rio de Janeiro", uf: "RJ", lat: -22.9129, lng: -43.2003 },
  { nome: "Curitiba", uf: "PR", lat: -25.4195, lng: -49.2646 },
  { nome: "Santos", uf: "ES", lat: -23.9535, lng: -46.335 },
  { nome: "Cuiaba", uf: "MT", lat: -15.601, lng: -56.0974 },
  { nome: "Porto Alegre", uf: "RS", lat: -30.0318, lng: -51.2065 },
  { nome: "Porto Alegre", uf: "RS", lat: -30.0318, lng: -51.2065 },
  { nome: "Porto Alegre", uf: "RS", lat: -30.0318, lng: -51.2065 },
  { nome: "Santos", uf: "ES", lat: -23.9535, lng: -46.335 },
  { nome: "Santos", uf: "ES", lat: -23.9535, lng: -46.335 },
  { nome: "Blumenau", uf: "SC", lat: -26.9155, lng: -49.0709 },
  { nome: "Florianópolis", uf: "SC", lat: -27.5945, lng: -48.5477 },
  { nome: "Dois Vizinhos", uf: "PR", lat: -25.7407, lng: -53.057 },
  { nome: "Dois Vizinhos", uf: "PR", lat: -25.7407, lng: -53.057 },
  { nome: "Dois Vizinhos", uf: "PR", lat: -25.7407, lng: -53.057 },
  { nome: "Dois Vizinhos", uf: "PR", lat: -25.7407, lng: -53.057 },
  { nome: "Dois Vizinhos", uf: "PR", lat: -25.7407, lng: -53.057 },
  { nome: "Sorriso", uf: "MT", lat: -12.5425, lng: -55.7211 },
  { nome: "Sorriso", uf: "MT", lat: -12.5425, lng: -55.7211 },
  { nome: "Sorriso", uf: "MT", lat: -12.5425, lng: -55.7211 },
  { nome: "Sorriso", uf: "MT", lat: -12.5425, lng: -55.7211 },
  { nome: "Sinop", uf: "MT", lat: -11.8604, lng: -55.5091 },
  { nome: "Sinop", uf: "MT", lat: -11.8604, lng: -55.5091 },
  { nome: "Sinop", uf: "MT", lat: -11.8604, lng: -55.5091 },
];

var menuMobileShow = false;

window.onload = function () {
  fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    .then((resp) => resp.json())
    .then((data) => {
      quartos = data.sort((a, b) =>
        a.price < b.price ? -1 : a.price > b.price ? 1 : 0
      );
      for (var i = 0; i < quartos.length; i++) {
        var quarto = quartos[i];

        quarto.id = i;
        quarto.cidade = cidades[i];
        createDivQuarto(quarto);

        quartosFilter.push(quarto);
      }

      createFilterPrice();
    });
};

function filtrar() {
  var quartos = Filtro.setQuartos(quartosFilter)
    .porCidade()
    .porNome()
    .porTipo()
    .porValor()
    .ordenarPor()
    .build();

  clearQuartos();

  quartos.forEach(createDivQuarto);
}

function clearQuartos() {
  var divQuartos = document.getElementById("quartos");
  var child = divQuartos.firstChild;

  while (child) {
    divQuartos.removeChild(child);
    child = divQuartos.firstChild;
  }
}

function createDivQuarto(quarto) {
  var divQuartos = document.getElementById("quartos");
  var divQuarto = document.createElement("div");
  divQuarto.id = quarto.id;
  divQuarto.className = "quarto";
  divQuarto.style.backgroundImage = "url(" + quarto.photo + ")";
  divQuarto.style.cursor = "pointer";

  divQuarto.addEventListener("click", viewInMap);

  createTipoQuarto(divQuarto, quarto.property_type);
  createDivInfoQuarto(divQuarto, quarto);

  divQuartos.appendChild(divQuarto);
}

function createTipoQuarto(divQuarto, tipo) {
  var divTipo = document.createElement("div");
  divTipo.className = "tipo";
  divTipo.innerHTML = tipo;
  divQuarto.appendChild(divTipo);

  appendOptionsToSelect(tipo);
}

function appendOptionsToSelect(tipo) {
  var select = document.getElementById("filtroTipo");
  var options = select.children;

  var hasOption = false;
  for (var i = 0; i < options.length; i++) {
    var option = options.item(i);
    if (option.value == tipo) {
      hasOption = true;
      break;
    }
  }

  if (!hasOption) {
    var op = document.createElement("option");
    op.value = tipo;
    op.label = tipo;
    select.appendChild(op);
  }
}

function createDivInfoQuarto(divQuarto, quarto) {
  var divInfoQuarto = document.createElement("div");
  divInfoQuarto.className = "infoquarto";

  createSpanPrice(divInfoQuarto, quarto);

  createDivCidade(divInfoQuarto, quarto);

  divQuarto.appendChild(divInfoQuarto);
}

function createDivCidade(divInfoQuarto, quarto) {
  var divCidade = document.createElement("div");
  divCidade.className = "cidade";

  var p = document.createElement("p");
  var cidade = quarto.cidade;
  p.innerHTML = cidade.nome + " - " + cidade.uf + "<br>" + quarto.name;
  divCidade.append(p);

  divInfoQuarto.append(divCidade);
}

function createSpanPrice(divInfoQuarto, quarto) {
  var money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(quarto.price);
  var spanPrice = document.createElement("span");
  spanPrice.className = "price";
  spanPrice.innerHTML = money;
  divInfoQuarto.append(spanPrice);
}

function createFilterPrice() {
  var q = quartosFilter.sort((a, b) =>
    a.price < b.price ? -1 : a.price > b.price ? 1 : 0
  );
  var min = q[0].price;
  var max = q[q.length - 1].price;
  // document.getElementById("vlMin").innerHTML = min;
  // document.getElementById("vlMax").innerHTML = max;
  // var elRangeValor = document.getElementById("rangeValor");

  // elRangeValor.value = min + "," + max;
  // elRangeValor.valueLow = min;
  // elRangeValor.valueHigh = max;
}

var map;
function viewInMap(el) {
  var divMap = document.getElementById("map");
  var btnModal = document.getElementById("btn-modal");
  var divLabelModalLocation = document.getElementById("labelModalLocation");
  var cidade = cidades[parseInt(el.currentTarget.id)];
  var quarto = quartosFilter[el.currentTarget.id];
  divLabelModalLocation.innerHTML = quarto.property_type + " em " + cidade.nome;
  var position = { lat: cidade.lat, lng: cidade.lng };
  var map = new google.maps.Map(divMap, {
    zoom: 16,
    center: position,
  });
  var marker = new google.maps.Marker({ position: position, map: map });

  btnModal.click();
}

function rangeValor(el) {
  console.log(el.value);
}

function showFiltros() {
  var lateralMobile = document.querySelector("#menu-lateral-mobile");
  menuMobileShow = !menuMobileShow;
  lateralMobile.style.display = menuMobileShow ? "block" : "none";
  var filtro = document.querySelector(".filtro");
  filtro.style.display = "block";
  lateralMobile.insertBefore(filtro, lateralMobile.children[0]);
}

function maskData(event) {
  var el = event.target;
  var regex = new RegExp(/\//g);
  var data = el.value.replace(regex, "");
  el.style.border = "none";

  if (data === "") return;

  var format = formatDate(data);

  if (event.type === "blur") {
    if (!validDate(format)) {
      el.style.border = "1px solid red";
    }

    return;
  }

  if (data.length == 8) {
    debugger;
    if (!validDate(format)) {
      el.style.border = "2px solid red";
    } else {
      el.value = new Date(format).toLocaleDateString("pt-BR");
    }
  }
}

function formatDate(data) {
  return data
    .substring(4, 8)
    .concat("-")
    .concat(data.substring(2, 4))
    .concat("-")
    .concat(data.substring(0, 2));
}

function validDate(data) {
  data = new Date(data).toLocaleDateString("pt-BR");

  return data !== "Invalid Date";
}

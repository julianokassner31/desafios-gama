var quartos = [];
var quartosFilter = [];
var cidades = [
  { nome: "São Paulo", lat: "", lng: "" },
  { nome: "Rio de Janeiro", lat: "", lng: "" },
  { nome: "Minas Gerais", lat: "", lng: "" },
  { nome: "Curitiba", lat: "", lng: "" },
  { nome: "Santos", lat: "", lng: "" },
  { nome: "Cuiaba", lat: "", lng: "" },
  { nome: "Porto Alegre", lat: "", lng: "" },
  { nome: "Bahia", lat: "", lng: "" },
  { nome: "Espirito Santo", lat: "", lng: "" },
  { nome: "Manaus", lat: "", lng: "" },
  { nome: "Ceará", lat: "", lng: "" },
  { nome: "Blumenau", lat: "", lng: "" },
  { nome: "Florianópolis", lat: "", lng: "" },
  { nome: "Dois Vizinhos", lat: "", lng: "" },
];

window.onload = function () {
  var request = new this.XMLHttpRequest();

  request.open(
    "GET",
    "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"
  );

  request.onload = function () {
    quartos = JSON.parse(this.responseText);
    for (var i = 0; i < quartos.length; i++) {
      var quarto = quartos[i];

      quarto.id = i + 1;
      quarto.cidade = cidades[i];
      createDivQuarto(quarto);

      quartosFilter.push(quarto);
    }
  };

  request.send();
};

function buscarPorCidade(input) {
  var regex = new RegExp(input.value);
  quartosFilter = quartos;
  quartosFilter = quartosFilter.filter((q) => regex.test(q.cidade));

  if (quartosFilter.length) {
    clearQuartos();
    quartosFilter.forEach((q) => createDivQuarto(q));
  }
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

  createTipoQuarto(divQuarto, quarto["property_type"]);
  createDivPrice(divQuarto, quarto.price);

  divQuartos.appendChild(divQuarto);
}

function createTipoQuarto(divQuarto, tipo) {
  var divTipo = document.createElement("div");
  divTipo.className = "tipo";
  divTipo.innerHTML = tipo;
  divQuarto.appendChild(divTipo);
}

function createDivPrice(divQuarto, price) {
  var divPrice = document.createElement("div");
  divPrice.className = "price";
  var money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
  var spanPrice = document.createElement("span");
  spanPrice.innerHTML = money;
  divPrice.append(spanPrice);
  divQuarto.appendChild(divPrice);
}

var map;
function viewInMap(ev) {
  console.log(ev);
  var divMap = document.getElementById("map");
  var containerMap = document.getElementById("container-map");
  var uluru = { lat: -23.533773, lng: -46.62529 };
  var map = new google.maps.Map(divMap, {
    zoom: 12,
    center: uluru,
  });
  var marker = new google.maps.Marker({ position: uluru, map: map });

  divMap.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  containerMap.addEventListener("click", function () {
    this.style.display = "none";
  });

  containerMap.style.display = "flex";
  containerMap.style.top = ev.clientY + "px";
  window.scrollTo({ top: ev.screenY - 100, behavior: "smooth" });
}

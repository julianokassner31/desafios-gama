var quartos = [];
var quartosFilter = [];
var cidades = [
  "São Paulo",
  "Rio de Janeiro",
  "Minas Gerais",
  "Curitiba",
  "Santos",
  "Cuiaba",
  "Porto Alegre",
  "Bahia",
  "Espirito Santo",
  "Manaus",
  "Ceará",
  "Blumenau",
  "Florianópolis",
  "Dois Vizinhos",
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

      createDivQuarto(quarto);

      quartosFilter.push(quarto);
    }
  };

  request.send();
};

function createDivQuarto(quarto) {
  var divQuartos = document.getElementById("quartos");
  var divQuarto = document.createElement("div");
  divQuarto.id = quarto.id;
  divQuarto.className = "quarto";
  divQuarto.style.backgroundImage = "url(" + quarto.photo + ")";

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
  divPrice.innerHTML = money;
  divQuarto.appendChild(divPrice);
}

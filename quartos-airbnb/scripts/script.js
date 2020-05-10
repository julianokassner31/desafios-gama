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

  divInfoQuarto.addEventListener("click", function (event) {
    event.stopPropagation();
    reservar(event);
  });

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
  var money = formatCurrencyMoney(quarto.price);
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
  var divMap = document.getElementById("modalContent");
  var btnModal = document.getElementById("btn-modal");
  var divLabelModalLocation = document.getElementById("labelModal");

  var divModalFooter = document.querySelector(".modal-footer");
  var buttonLogin = divModalFooter.children[0];
  buttonLogin.innerText = "Fechar";

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

  clearInputError(el);

  if (el.value === "") return;

  var dataStringFormat = replaceSlashBar(el);

  if (event.type === "blur") {
    var { hasError, messageError } = validDate(dataStringFormat, el);
    if (hasError) {
      setErrorInputDate(el, messageError);
    }

    return;
  }

  if (el.value.length == 8) {
    var { hasError, messageError } = validDate(dataStringFormat, el);
    if (hasError) {
      setErrorInputDate(el, messageError);
    } else {
      el.value = formatDatePtBr(dataStringFormat);
    }
  }
}

function clearInputError(el) {
  el.style.border = "none";
  el.parentElement.children[1].style.visibility = "hidden";
  el.parentElement.children[1].innerHTML = "";
}

function setErrorInputDate(el, messageError) {
  el.style.border = "2px solid red";
  el.parentElement.children[1].style.visibility = "visible";
  el.parentElement.children[1].innerHTML = messageError;
}

function formatDatePtBr(dataStringFormat) {
  return moment(dataStringFormat).format("DD/MM/YYYY");
}

function replaceSlashBar(el) {
  var regex = new RegExp(/\//g);
  var data = el.value.replace(regex, "");

  var ano = data.substring(4, 8);
  var mes = data.substring(2, 4);
  var dia = data.substring(0, 2);

  return ano.concat("-").concat(mes).concat("-").concat(dia);
}

function validDate(dataStringFormat, el) {
  hasError = false;
  messageError = "";
  data = moment(dataStringFormat).format("DD/MM/YYYY");

  if (data === "Invalid date") {
    messageError = "Data inválida!";
    hasError = true;
  }

  if (!hasError && retroactiveDate(dataStringFormat, moment.now())) {
    messageError = "Data informada deve ser maior ou igual a hoje.";
    hasError = true;
  }

  if (!hasError && el.parentElement.id === "checkout") {
    var elCheckin = document.getElementById("checkin").children[0];
    var checkinDataStringFormat = replaceSlashBar(elCheckin);
    if (
      isSameDate(dataStringFormat, moment(checkinDataStringFormat)) ||
      retroactiveDate(dataStringFormat, moment(checkinDataStringFormat))
    ) {
      messageError = "Data de checkout deve ser maior que checkin!";
      hasError = true;
    }
  }

  return {
    hasError,
    messageError,
  };
}

function isSameDate(dataStringFormat, dataCompare) {
  return moment(dataStringFormat).isSame(
    moment(dataCompare),
    "day",
    "year",
    "month"
  );
}

function retroactiveDate(dataStringFormat, dataCompare) {
  return moment(dataStringFormat).isBefore(dataCompare);
}

function reservar(event) {
  validaData = function (el) {
    var dataStringFormat = replaceSlashBar(el);

    return validDate(dataStringFormat, el);
  };

  var divInfoQuarto = event.currentTarget;
  var content = document.getElementById("modalContent");
  var divLabelModal = document.getElementById("labelModal");
  divLabelModal.innerHTML = "Alugar quarto";

  var elCheckin = document.getElementById("checkin").children[0];
  var elCheckout = document.getElementById("checkout").children[0];

  var divModalFooter = document.querySelector(".modal-footer");
  var buttonLogin = divModalFooter.children[0];
  buttonLogin.innerText = "Login";

  if (validaData(elCheckin).hasError || validaData(elCheckout).hasError) {
    content.innerText =
      "Não foi possível calcular o valor total apartir da datas informadas!";
    buttonLogin.innerText = "Fechar";
  } else {
    const vlFormat = divInfoQuarto.children[0].innerText;
    var priceDaily = parseFloat(vlFormat.replace(/\D[$]/g, ""));
    var dias = calcDays(elCheckin, elCheckout);
    var vltotal = priceDaily * dias;
    content.innerHTML = `
      <p>Você está reservando o quarto em ${
        divInfoQuarto.children[1].innerHTML
      }<br>
        com diária no valor de ${vlFormat}.</br>
        Sua estádia será de ${dias} dia(s).
      </p>
      <span>Valor total: ${formatCurrencyMoney(vltotal)}</span>
      <p> Para prosseguir com sua reserva é necessário realizar o login.</p>
    `;
  }

  var btnModal = document.getElementById("btn-modal");
  btnModal.click();
}

function calcDays(elCheckin, elCheckout) {
  checkinFormatString = replaceSlashBar(elCheckin);
  checkoutFormatString = replaceSlashBar(elCheckout);

  return moment(checkoutFormatString).diff(moment(checkinFormatString), "days");
}

function formatCurrencyMoney(vl) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(vl);
}

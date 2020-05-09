var Filtro = (function () {
  var _quartos;

  function _porCidade() {
    var inputCidade = document.getElementById("inputCidade");
    var regex = new RegExp(inputCidade.value, "i");
    _quartos = _quartos.filter((q) => regex.test(q.cidade.nome));
    return this;
  }

  function _porNome() {
    var inputNome = document.getElementById("nome");
    var regex = new RegExp(inputNome.value, "i");
    _quartos = _quartos.filter((q) => regex.test(q.name));
    return this;
  }

  function _porTipo() {
    var selectTipo = document.getElementById("filtroTipo");

    if (selectTipo.value === "" || selectTipo.value === "Tudo") return this;
    _quartos = _quartos.filter((q) => q.property_type === selectTipo.value);
    return this;
  }

  function _porValor() {
    return this;
  }

  function _ordenarPor() {
    var order = document.getElementById("order");
    _quartos = _quartos.sort((a, b) => {
      if (order.value === "nome") {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      } else if (order.value === "menor") {
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
      } else if (order.value === "maior") {
        return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
      } else if (order.value === "tipo") {
        return a.property_type < b.property_type
          ? -1
          : a.property_type > b.property_type
          ? 1
          : 0;
      }
    });
    return this;
  }

  function _setQuartos(quartos) {
    _quartos = quartos;
    return this;
  }

  return {
    setQuartos: _setQuartos,
    porCidade: _porCidade,
    porTipo: _porTipo,
    porValor: _porValor,
    porNome: _porNome,
    ordenarPor: _ordenarPor,
    build: function () {
      return _quartos;
    },
  };
})();

var Filtro = (function () {
  var _quartos;

  function _porCidade() {
    var inputCidade = document.getElementById("inputCidade");
    var regex = new RegExp(inputCidade.value, "i");
    _quartos = _quartos.filter((q) => regex.test(q.cidade.nome));
    return this;
  }

  function _porTipo() {
    return this;
  }

  function _porValor() {
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
    build: function () {
      return _quartos;
    },
  };
})();

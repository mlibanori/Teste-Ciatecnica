var app = angular.module('ciatecnicaApp', ['ui.utils.masks', 'ngRoute', 'ngResource', 'ngMessages'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})

app.config(function ($routeProvider) {

    $routeProvider.when('/cadastrar', {
        templateUrl: 'templates/formCliente.html',
        controller: 'formCliente'
    });
    $routeProvider.when('/clientes/:id', {
        templateUrl: 'templates/formCliente.html',
        controller: 'formCliente'
    });
    $routeProvider.when('/listar', {
        templateUrl: 'templates/listCliente.html',
        controller: 'listCliente'
    });

    $routeProvider.otherwise({ redirectTo: '/listar' });
});

app.factory('CiaTecnicaApi', function ($resource) {
    return $resource('/api/clientes/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
});

app.controller('listCliente', function ($scope, $http, CiaTecnicaApi) {
    CiaTecnicaApi.query().$promise.then(function (clientes) {
        $scope.clientes = clientes;
    })

    $scope.excluir = function (index) {
        if (confirm(`Deseja realmente excluir o item ID. ${$scope.clientes[index].id}`)) {
            CiaTecnicaApi.remove({ id: $scope.clientes[index].id }, function () {
                alert("Excluido com Sucesso");
                $scope.clientes.splice(index, 1);
            }, function () {
                alert("Ocorreu um erro!");
            });
        }
    }
})


app.controller('formCliente', function ($scope, $http, $filter, CiaTecnicaApi, $routeParams) {

    $scope.minDataNascimento = new Date();
    $scope.minDataNascimento.setFullYear($scope.minDataNascimento.getFullYear() - 19);
    $scope.minDataNascimento = $scope.minDataNascimento.toISOString();
    $scope.cliente = {};
    $scope.cliente.cpfCNPJ = "";
    $scope.cliente.pf = {};
    $scope.cliente.pj = {};

    if ($routeParams.id) {
        CiaTecnicaApi.get({ id: $routeParams.id }, function (data) {
    
            $scope.cliente.nome = data.nome;
            $scope.cliente.cep = data.cep;
            $scope.cliente.logradouro = data.logradouro;
            $scope.cliente.numero = data.numero;
            $scope.cliente.complemento = data.complemento;
            $scope.cliente.bairro = data.bairro;
            $scope.cliente.cidade = data.cidade;
            $scope.cliente.uf = data.uf;
            $scope.cliente.cpfCNPJ = data.pessoable.cpf || data.pessoable.cnpj;
            if (data.pessoable.cpf) {
                
                $scope.cliente.pf.sobrenome = data.pessoable.sobrenome;
                $scope.cliente.pf.dataNascimento = new Date(data.pessoable.dataNascimento);

            }
            else{
              
             $scope.cliente.pj.razaoSocial = data.pessoable.razaoSocial;

            }

        });
    }




    $scope.reset = function () {
        $scope.cliente = {};
        $scope.cliente.cpfCNPJ = "";
        $scope.cliente.pf = {};
        $scope.cliente.pj = {};
        $scope.formCliente.$setUntouched();
    }

    $scope.salvar = function () {
        var data = new CiaTecnicaApi();
        data.pessoa = {};
        data.pf = {};
        data.pj = {}
        data.type = null;

        data.pessoa.nome = $scope.cliente.nome;
        data.pessoa.cep = $scope.cliente.cep;
        data.pessoa.logradouro = $scope.cliente.logradouro;
        data.pessoa.numero = $scope.cliente.numero;
        data.pessoa.complemento = $scope.cliente.complemento;
        data.pessoa.bairro = $scope.cliente.bairro;
        data.pessoa.cidade = $scope.cliente.cidade;
        data.pessoa.uf = $scope.cliente.uf;

        if ($scope.cliente.cpfCNPJ.length == 14) {

            data.type = 'pj';
            data.pj.cnpj = $scope.cliente.cpfCNPJ;
            data.pj.razaoSocial = $scope.cliente.pj.razaoSocial;

        }
        else {
            data.type = 'pf';
            data.pf.cpf = $scope.cliente.cpfCNPJ;
            data.pf.sobrenome = $scope.cliente.pf.sobrenome;
            data.pf.dataNascimento = $filter('date')($scope.cliente.pf.dataNascimento, 'yyyy-MM-dd');
        }
        if ($routeParams.id) {
            CiaTecnicaApi.update({ id: $routeParams.id }, data, function () {
                alert("Salvo com Sucesso!");
            }, function () {
                alert("Ocorreu um erro!");
            });
        }
        else {
            data.$save(function () {
                alert("Salvo com Sucesso!");
                $scope.reset();
            }, function () {
                alert("Ocorreu um erro!");
            });
        }
    }




    $scope.getCEP = function () {
        if ($scope.cliente.cep) {
            $http.get(`https://viacep.com.br/ws/${$scope.cliente.cep}/json/unicode/`).then(function (response) {
                $scope.cliente.logradouro = response.data.logradouro;
                $scope.cliente.bairro = response.data.bairro;
                $scope.cliente.cidade = response.data.localidade;
                $scope.cliente.uf = response.data.uf;
            }, function (err) {
                console.log(err);
            });
        }
    }

});
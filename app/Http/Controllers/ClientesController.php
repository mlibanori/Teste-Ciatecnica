<?php

namespace App\Http\Controllers;

use App\Pessoa;
use App\PessoaFisica;
use App\PessoaJuridica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientesController extends Controller
{
    public function index()
    {
        $pessoas = Pessoa::get();
        return response()->json($pessoas);
    }

    public function show($id)
    {
        $pessoa = Pessoa::with("pessoable")->find($id);

        if (!$pessoa) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }



        return response()->json($pessoa);
    }

    public function store(Request $request)
    {

        $validatorPessoa = Validator::make($request->all()['pessoa'], [
            'nome' => 'required',
            'cep' => 'required',
            'logradouro' => 'required',
            'numero' => 'required',
            'bairro' => 'required',
            'cidade' => 'required',
            'uf' => 'required'
        ]);

        if ($validatorPessoa->fails()) {
            return response()->json([
                'message'   => $validatorPessoa->messages()->first()
            ], 404);
        }
        $pessoa = new Pessoa();
        $pessoa->fill($request->all()['pessoa']);
        if ($request->all()['type'] == 'pf') {
            $pessoable = PessoaFisica::create($request->all()['pf']);
            $pessoable->pessoa()->save($pessoa);
        } else {
            $pessoable = PessoaJuridica::create($request->all()['pj']);
            $pessoable->pessoa()->save($pessoa);
        }


        return response()->json($pessoable, 201);
    }

    public function update(Request $request, $id)
    {
        $pessoa = Pessoa::with("pessoable")->find($id);

        if (!$pessoa) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $pessoa->fill($request->all()['pessoa']);
        $pessoa->pessoable->fill(array_merge($request->all()['pj'], $request->all()['pf']));
        $pessoa->save();
        $pessoa->pessoable->save();

        return response()->json($pessoa);
    }

    public function destroy($id)
    {
        $pessoa = Pessoa::with("pessoable")->find($id);

        if (!$pessoa) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }
        $pessoa->pessoable->delete();
        $pessoa->delete();
    }
}

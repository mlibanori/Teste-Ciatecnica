<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PessoaJuridica extends Model
{
    protected $fillable = ['cnpj', 'razaoSocial'];
    public $timestamps = false;

    public function pessoa(){
        return $this->morphOne('App\Pessoa', 'pessoable');
    }
}

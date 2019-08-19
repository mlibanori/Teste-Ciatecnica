<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PessoaFisica extends Model
{
    protected $fillable = ['cpf', 'sobrenome', 'dataNascimento'];
    public $timestamps = false;

    public function pessoa(){
        return $this->morphOne('App\Pessoa', 'pessoable');
    }
}

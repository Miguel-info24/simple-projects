<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ["name" => "gerentes.index"],
            ["name" => "gerentes.create"],
            ["name" => "gerentes.edit"],
            ["name" => "gerentes.delete"],

            ["name" => "clientes.index"],
            ["name" => "clientes.create"],
            ["name" => "clientes.edit"],
            ["name" => "clientes.delete"],

            ["name" => "solicitacoes-limite.index"],
            ["name" => "solicitacoes-limite.create"],
            ["name" => "solicitacoes-limite.approve"],
            ["name" => "solicitacoes-limite.reject"],

            ["name" => "clientes.bloquear"],
            ["name" => "clientes.desbloquear"],
        ];

        DB::table('resources')->insert($data);
    }
}
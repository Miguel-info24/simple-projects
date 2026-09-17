<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ["name" => "gerenteGeral"],	// 1
            ["name" => "gerenteConta"],	// 2
            ["name" => "Cliente"],	// 3
        ];
        DB::table('roles')->insert($data);
    }
}

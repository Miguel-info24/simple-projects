<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitacao_limites', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conta_id')
                ->constrained('contas')
                ->cascadeOnDelete();

            $table->decimal('limite_atual', 15, 2);

            $table->decimal('limite_solicitado', 15, 2);

            $table->string('status')->default('Pendente');

            $table->text('motivo')->nullable();

            $table->foreignId('aprovado_por')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('aprovado_em')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitacao_limites');
    }
};
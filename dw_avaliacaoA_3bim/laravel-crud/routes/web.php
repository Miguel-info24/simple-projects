<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GerenteContaController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SolicitacaoLimiteController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/gerentes', GerenteContaController::class)->except(['show']);
    Route::resource('/clientes', \App\Http\Controllers\ClienteController::class)->except(['show']);
    Route::get('/solicitacoes-limite', [SolicitacaoLimiteController::class, 'index'])->name('solicitacoes-limite.index');
    Route::get('/solicitacoes-limite/create', [SolicitacaoLimiteController::class, 'create'])->name('solicitacoes-limite.create');
    Route::post('/solicitacoes-limite', [SolicitacaoLimiteController::class, 'store'])->name('solicitacoes-limite.store');
    Route::post('/solicitacoes-limite/{id}/aprovar', [SolicitacaoLimiteController::class, 'aprovar'])->name('solicitacoes-limite.aprovar');
    Route::post('/solicitacoes-limite/{id}/reprovar', [SolicitacaoLimiteController::class, 'reprovar'])->name('solicitacoes-limite.reprovar');
    Route::post('/clientes/{id}/bloquear', [ClienteController::class, 'bloquear'])->name('clientes.bloquear');
    Route::post('/clientes/{id}/desbloquear', [ClienteController::class, 'desbloquear'])->name('clientes.desbloquear');
});

require __DIR__.'/auth.php';

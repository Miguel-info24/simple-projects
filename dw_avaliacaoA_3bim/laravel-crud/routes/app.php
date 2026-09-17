<?php


use Illuminate\Support\Facades\Route;

Route::get('/home', function () {
    return view('home');
})->name('home')->middleware(['auth', 'verified']);



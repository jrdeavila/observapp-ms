<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'client']);


        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->assignRole('admin');

        \App\Models\User::factory()->create([
            'name' => "Julian",
            "email" => "julian@observatorio.com",
        ])->assignRole("admin");

        \App\Models\User::factory()->create([
            'name' => "Keren",
            "email" => "keren@observatorio.com",
        ])->assignRole("admin");

        \App\Models\User::factory()->create([
            'name' => "Tatiana",
            "email" => "tatiana@observatorio.com",
        ])->assignRole("admin");
    }
}

<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\SubSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $s1 = Section::factory()->create([
            'title' => 'Dinamica empresarial',
            'slug' => 'dinamica-empresarial',
            'description' => 'La region de Valledupar cuenta con una gran cantidad de empresas que se dedican a la produccion de bienes y servicios, en esta seccion podras encontrar informacion sobre las empresas mas importantes de la region.',
        ]);

        $s1->subSections()->save(SubSection::factory()->create([
            'title' => 'Empresas Activas',
            'slug' => 'empresas-activas',
            'description' => 'En esta seccion podras encontrar informacion sobre las empresas activas en la region de Valledupar',
            'section_id' => $s1->id,
            "dashboard_url" => "http://192.168.0.12:8080/metabase/public/dashboard/bc3121df-c6d7-4faf-bd58-20944dd7dd0c",
        ]));

        $s1->subSections()->save(SubSection::factory()->create([
            'title' => 'Empresas Renovadas',
            'slug' => 'empresas-renovadas',
            'description' => 'En esta seccion podras encontrar informacion sobre las empresas renovadas en la region de Valledupar',
            'section_id' => $s1->id,
            'dashboard_url' => "http://192.168.0.12:8080/metabase/public/dashboard/bc3121df-c6d7-4faf-bd58-20944dd7dd0c7"
        ]));

        $s1->subSections()->save(SubSection::factory()->create([
            'title' => 'Empresas Canceladas',
            'slug' => 'empresas-canceladas',
            'description' => 'En esta seccion podras encontrar informacion sobre las empresas canceladas en la region de Valledupar',
            'section_id' => $s1->id,
            'dashboard_url' => "http://192.168.0.12:8080/metabase/public/dashboard/bc3121df-c6d7-4faf-bd58-20944dd7dd0c7"
        ]));
    }
}

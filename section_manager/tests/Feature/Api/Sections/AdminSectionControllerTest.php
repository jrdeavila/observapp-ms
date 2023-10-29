<?php

namespace Tests\Feature\Api;

use App\Models\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminSectionControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_list_sections()
    {
        $sections = Section::factory()->count(3)->create();

        $response = $this->getJson(route('admin.sections.index'));

        $response->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'slug',
                        'image',
                    ]
                ]
            ]);
    }

    public function test_can_create_section()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->image('section.jpg');
        $data = [
            'title' => $this->faker->sentence(2),
            'image' => $file,
        ];

        $response = $this->postJson(route('admin.sections.store'), $data);

        $response->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'title',
                    'description',
                    'image',
                    'slug',
                ]
            ]);
    }

    public function test_can_update_section()
    {
        $section = Section::factory()->create();
        Storage::fake('public');
        $file = UploadedFile::fake()->image('section.jpg');

        $data = [
            'title' => $this->faker->sentence(2),
            'image' => $file,
        ];

        $response = $this->putJson(route('admin.sections.update', $section->slug), $data);

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'title',
                    'description',
                    'image',
                    'slug',
                ]
            ]);
    }

    public function test_can_delete_section()
    {
        $section = Section::factory()->create();

        $response = $this->deleteJson(route('admin.sections.destroy', $section->slug));

        $response->assertOk()
            ->assertJson([
                'message' => 'Sección eliminada correctamente',
            ]);
    }
}

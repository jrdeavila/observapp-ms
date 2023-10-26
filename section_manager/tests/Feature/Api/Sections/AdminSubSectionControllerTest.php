<?php

namespace Tests\Feature\Api\Sections;

use App\Models\Section;
use App\Models\SubSection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminSubSectionControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_list_subsections_of_a_section()
    {
        $section = Section::factory()->create();
        SubSection::factory()->count(3)->create([
            'section_id' => $section->id,
        ]);

        $response = $this->getJson(route('admin.sections.subsections.index', $section));

        $response->assertOk();
        $response->assertJsonCount(3, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'description',
                    'image',
                    'slug',
                    'dashboard_url',
                ],
            ],
        ]);
    }

    /** @test */
    public function it_can_create_a_subsection()
    {
        Storage::fake('public');
        $section = Section::factory()->create();
        $data = [
            'title' => $this->faker->name,
            'description' => $this->faker->sentence,
            'image' => UploadedFile::fake()->image('image.jpg'),
            'dashboard_url' => $this->faker->url,
        ];

        $response = $this->postJson(route('admin.sections.subsections.store', $section), $data);

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'description',
                'image',
                'slug',
                'dashboard_url',

            ],
        ]);
        $this->assertDatabaseHas('sub_sections', [
            'title' => $data['title'],
            'description' => $data['description'],
            'section_id' => $section->id,
        ]);
        Storage::disk('public')->exists($response->json('data.image'));
    }

    /** @test */
    public function it_can_update_a_subsection()
    {
        Storage::fake('public');
        $section = Section::factory()->create();
        $subsection = SubSection::factory()->create([
            'section_id' => $section->id,
        ]);
        $data = [
            'title' => $this->faker->name,
            'description' => $this->faker->sentence,
            'image' => UploadedFile::fake()->image('image.jpg'),
            'dashboard_url' => $this->faker->url,
        ];

        $response = $this->putJson(route('admin.sections.subsections.update', [$section, $subsection]), $data);

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'description',
                'image',
                'slug',
                'dashboard_url',
            ],
        ]);
        $this->assertDatabaseHas('sub_sections', [
            'id' => $subsection->id,
            'title' => $data['title'],
            'description' => $data['description'],
            'section_id' => $section->id,
        ]);
        Storage::disk('public')->exists($response->json('data.image'));
    }

    /** @test */
    public function it_can_delete_a_subsection()
    {
        $section = Section::factory()->create();
        $subsection = SubSection::factory()->create([
            'section_id' => $section->id,
        ]);

        $response = $this->deleteJson(route('admin.sections.subsections.destroy', [$section, $subsection]));

        $response->assertOk();
        $this->assertDatabaseMissing('sub_sections', [
            'id' => $subsection->id,
        ]);
    }

    /** @test */
    public function it_cannot_update_a_subsection_that_does_not_belong_to_the_section()
    {
        $section = Section::factory()->create();
        $anotherSection = Section::factory()->create();
        $subsection = SubSection::factory()->create([
            'section_id' => $anotherSection->id,
        ]);

        $response = $this->putJson(route('admin.sections.subsections.update', [$section, $subsection]), [
            'title' => $this->faker->name,
            'description' => $this->faker->sentence,
            'image' => UploadedFile::fake()->image('image.jpg'),
            'dashboard_url' => $this->faker->url,
        ]);

        $response->assertForbidden();
        $response->assertJson([
            'message' => 'La subsección no pertenece a la sección',
        ]);
    }

    /** @test */
    public function it_cannot_delete_a_subsection_that_does_not_belong_to_the_section()
    {
        $section = Section::factory()->create();
        $anotherSection = Section::factory()->create();
        $subsection = SubSection::factory()->create([
            'section_id' => $anotherSection->id,
        ]);

        $response = $this->deleteJson(route('admin.sections.subsections.destroy', [$section, $subsection]));

        $response->assertForbidden();
        $response->assertJson([
            'message' => 'La subsección no pertenece a la sección',
        ]);
    }
}

<?php

namespace Tests\Feature\Api\Sections;

use App\Models\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SectionControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_list_all_sections()
    {
        $sections = Section::factory()->count(3)->create();

        $response = $this->getJson(route('sections.index'));

        $response->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'image'
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_can_show_a_single_section()
    {
        $section = Section::factory()->create();

        $response = $this->getJson(route('sections.show', $section));

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'title',
                    'description',
                    'image',
                    'sub-sections' => [
                        '*' => [
                            'id',
                            'title',
                            'slug',
                            'description',
                            'image'
                        ]
                    ]
                ]
            ]);
    }
}

<?php

namespace App\Http\Controllers\Api\Sections;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Resources\Api\Sections\SectionCollection;
use App\Http\Resources\Api\Sections\ExtendedSectionResource;

class SectionController extends Controller
{
    public function index(): SectionCollection
    {
        $sections = Section::all();

        return new SectionCollection($sections);
    }

    public function show(Section $section): ExtendedSectionResource
    {
        return new ExtendedSectionResource($section);
    }
}

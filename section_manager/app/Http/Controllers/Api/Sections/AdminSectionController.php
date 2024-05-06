<?php

namespace App\Http\Controllers\Api\Sections;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Sections\SectionResource;
use App\Models\Section;
use App\Http\Requests\Api\Section\SectionRequest;
use App\Http\Resources\Api\Sections\SectionCollection;

class AdminSectionController extends Controller
{
    public function index(): SectionCollection
    {
        $sections = Section::all();

        return new SectionCollection($sections);
    }

    public function show(Section $section): SectionResource
    {
        return new SectionResource($section);
    }


    public function store(SectionRequest $request)
    {
        $section = Section::create([
            ...$request->validated(),
            'image' => $request->saveImage(),
            'slug' => $request->generateSlug(),
        ]);
        return new SectionResource($section);
    }

    public function update(SectionRequest $request, Section $section)
    {
        $section->update([
            ...$request->validated(),
            'image' => $request->hasFile('image') ? $request->saveImage() : $section->image,
            'slug' => $request->generateSlug(),
        ]);
        return new SectionResource($section);
    }

    public function destroy(Section $section)
    {
        $section->delete();
        return response()->json([
            'message' => 'Sección eliminada correctamente',
        ]);
    }
}

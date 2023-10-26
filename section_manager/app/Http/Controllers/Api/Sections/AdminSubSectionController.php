<?php

namespace App\Http\Controllers\Api\Sections;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Section\CreateSubSectionRequest;
use App\Http\Resources\Api\Sections\SubSectionCollection;
use App\Http\Resources\Api\Sections\SubSectionResource;
use App\Models\Section;
use App\Models\SubSection;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminSubSectionController extends Controller
{


    public function index(Section $section): SubSectionCollection
    {
        return new SubSectionCollection($section->subSections);
    }


    public function store(Section $section, CreateSubSectionRequest $request): SubSectionResource
    {
        $subsection =  SubSection::create([
            ...$request->validated(),
            'image' => $request->saveImage(),
            'slug' => $request->generateSlug(),
            'section_id' => $section->id,
        ]);

        return new SubSectionResource($subsection);
    }

    public function update(Section $section, SubSection $subsection, CreateSubSectionRequest $request): SubSectionResource
    {
        throw_unless($section->id === $subsection->section_id, new HttpException(403, 'La subsección no pertenece a la sección'));

        $subsection->update([
            ...$request->validated(),
            'image' => $request->saveImage(),
            'slug' => $request->generateSlug(),
            'section_id' => $section->id,
        ]);

        return new SubSectionResource($subsection);
    }

    public function destroy(Section $section, SubSection $subsection)
    {
        if ($section->id !== $subsection->section_id) {
            return response()->json([
                'message' => 'La subsección no pertenece a la sección',
            ], 403);
        }
        $subsection->delete();
        return response()->json([
            'message' => 'Subsección eliminada correctamente',
        ]);
    }
}

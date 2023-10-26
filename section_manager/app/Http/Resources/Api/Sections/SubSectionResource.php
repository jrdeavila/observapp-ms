<?php

namespace App\Http\Resources\Api\Sections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => (string) $this->description,
            'slug' => $this->slug,
            'image' => $this->image,
            'dashboard_url' => $this->dashboard_url,

        ];
    }
}

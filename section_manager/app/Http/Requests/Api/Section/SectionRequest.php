<?php

namespace App\Http\Requests\Api\Section;

use App\Models\Section;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class SectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|unique:sections,title|max:255',
            'description' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function saveImage()
    {
        if ($this->has('image')) {
            $image = $this->file('image');
            $path = $image->store('sections', 'public');
            return $path;
        } else {
            return null;
        }
    }

    public function generateSlug(): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $this->title)));
    }


    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array
    {
        return [
            'title.required' => 'El título es requerido',
            'title.string' => 'El título debe ser una cadena de texto',
            'title.unique' => 'El título ya existe',
            'title.max' => 'El título no debe ser mayor a 255 caracteres',
            'image.required' => 'La imagen es requerida',
            'image.image' => 'La imagen debe ser una imagen',
            'image.mimes' => 'La imagen debe ser un archivo de tipo: jpeg, png, jpg, gif, svg',
            'image.max' => 'La imagen no debe pesar más de 2MB',
        ];
    }


    /**
     *  With Validator
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            Section::where('slug', $this->generateSlug())->exists() ? $validator->errors()->add('title', 'El título ya existe') : null;
        });
    }
}

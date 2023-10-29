<?php

namespace App\Http\Requests\Api\Section;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateSubSectionRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sub_sections')->ignore($this->subsection),
            ],
            'description' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'dashboard_url' => 'sometimes|string',
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
            'description.required' => 'La descripción es requerida',
            'description.string' => 'La descripción debe ser una cadena de texto',
            'description.max' => 'La descripción no debe ser mayor a 255 caracteres',
            'image.required' => 'La imagen es requerida',
            'image.image' => 'La imagen debe ser una imagen',
            'image.mimes' => 'La imagen debe ser de tipo jpeg,png,jpg,gif,svg',
            'section_id.required' => 'La sección es requerida',
            'section_id.exists' => 'La sección no existe',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, response()->json([
            'message' => 'Error de validación',
            'errors' => $validator->errors()
        ], 422));
    }
}

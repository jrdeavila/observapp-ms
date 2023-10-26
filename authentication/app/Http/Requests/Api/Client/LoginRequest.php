<?php

namespace App\Http\Requests\Api\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class LoginRequest extends FormRequest
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
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6'
        ];
    }


    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */

    public function messages(): array
    {
        return [
            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El correo electrónico debe ser una dirección de correo electrónico válida',
            'email.exists' => 'El correo electrónico no existe',
            'password.required' => 'La contraseña es requerida',
            'password.string' => 'La contraseña debe ser una cadena',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres'

        ];
    }

    /**
     * With Validator
     *  @param \Illuminate\Contracts\Validation\Validator $validator
     *  @return void
     */

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Validate if password is correct only if email is valid
            if ($validator->errors()->has('email')) {
                return;
            }
            if (auth()->attempt(['email' => $this->email, 'password' => $this->password]) === false) {
                $validator->errors()->add('password', 'La contraseña es incorrecta');
                return;
            }

            // Check if user is client
            if (!auth()->user()->isClient) {
                $validator->errors()->add('email', 'Debe ser un cliente para iniciar sesión en esta aplicación');
                return;
            }
        });
    }
}

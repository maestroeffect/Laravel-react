<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => ['required','string','max:55'],
            'email' => ['required','string','email','unique:users,email,'.$this->route('user')->id],
            'password' => ['nullable','string','min:8','confirmed'],
            // 'role' => ['nullable','string','in:admin,user'],
            // 'status' => ['nullable','string','in:active,inactive'],
        ];
    }
}

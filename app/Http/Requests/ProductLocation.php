<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductLocation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pro_no' => 'required',
            'building_no' => 'required|integer',
            'floor_no' => 'integer|nullable',
            'shelf' => 'integer|nullable',
            'qty' => 'integer|nullable',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'pro_no.required' => 'A pro_no is required ok?',
            'building_no.required' => 'A building_no is required',
        ];
    }
}

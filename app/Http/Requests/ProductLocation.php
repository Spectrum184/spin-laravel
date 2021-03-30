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
            'Pro_No' => 'required',
            'Building_No' => 'required|integer',
            'Floor_No' => 'integer|nullable',
            'Shelf' => 'integer|nullable',
            'Qty' => 'integer|nullable',
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
            'Pro_No.required' => 'A pro_no is required ok?',
            'Building_No.required' => 'A building_no is required',
        ];
    }
}

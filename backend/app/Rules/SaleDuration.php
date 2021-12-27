<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class SaleDuration implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!is_string($value)) {
            return false;
        }
        $valueArray = explode(" ", $value);
        $days = $valueArray[0];
        $hours = $valueArray[1];
        $minutes = $valueArray[2];

        if (is_null($days) && is_null($hours) && is_null($minutes)) {
            return false;
        } else {
            $days = intval(substr_replace($days, "", -1));
            $hours = intval(substr_replace($hours, "", -1));
            $minutes = intval(substr_replace($minutes, "", -1));
            if (($days < 0 || $hours < 0 || $minutes < 0) || (($days + ($hours / 24) + ($minutes / (24 * 60))) > 2)) {
                return false;
            }
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The format should be Xd Yh, where X is either 0 and 1, Y between 0 and 23, and the total duration is less than 2 days.';
    }
}

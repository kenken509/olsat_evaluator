<?php
class RangeParser
{
    public static function parse($range)
    {
        if (str_contains($range, 'above')) {
            preg_match('/\d+/', $range, $num);
            return [(int)$num[0] + 1, 9999];
        }

        if (str_contains($range, 'below')) {
            preg_match('/\d+/', $range, $num);
            return [0, (int)$num[0] - 1];
        }

        if (str_contains($range, '-')) {
            [$min, $max] = explode('-', $range);
            return [(int)$min, (int)$max];
        }

        return [(int)$range, (int)$range];
    }
}
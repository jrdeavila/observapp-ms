<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model

{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
    ];

    public function subSections()
    {
        return $this->hasMany(SubSection::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

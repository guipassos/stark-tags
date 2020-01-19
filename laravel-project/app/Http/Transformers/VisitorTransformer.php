<?php


namespace App\Http\Transformers;

use App\Visitor;
use League\Fractal\TransformerAbstract;

class VisitorTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = [];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [];


    /**
     * A Fractal transformer.
     *
     * @param Visitor $visitor
     * @return array
     */
    public function transform(Visitor $visitor)
    {
        return [
            'id'            => $visitor->id,
            'name'          => $visitor->name,
            'document'      => $visitor->document,
            'date_of_birth' => $visitor->date_of_birth,
            'email'         => $visitor->email,
        ];
    }
}

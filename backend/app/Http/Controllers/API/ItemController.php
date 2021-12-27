<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\ItemManagerInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;

class ItemController extends BaseController
{
    private ItemManagerInterface $itemManager;

    public function __construct(ItemManagerInterface $itemManager)
    {
        $this->itemManager = $itemManager;
    }

    public function createItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'thumbnail' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }

        if ($this->itemManager->createItem($request)) {
            return $this->sendResponse(null, 'Item created successfully and add it to the inventory of the user.', null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }
}

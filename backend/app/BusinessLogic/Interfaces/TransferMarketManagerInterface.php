<?php

namespace App\BusinessLogic\Interfaces;

interface TransferMarketManagerInterface
{
    public function getUserTransferMarketItems();
    public function searchMarketPlace($itemFilters, $marketFilters);
}

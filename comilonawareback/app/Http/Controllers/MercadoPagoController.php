<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Item;
class MercadoPagoController extends Controller
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken('TEST-7635738400707710-110120-59f9466ac6ca98c6c93f6524dce4e123-190848384');
    }
    public function createPreference(Request $request)
    {
        $preferenceClient = new PreferenceClient();
        $preferenceData = [
            "items" => [
                [
                    "id" => 'DEP-001',
                    "title" => 'Pedido ' . $request->input('purchase_id'), 
                    "quantity" => 1,
                    "unit_price" => $request->input('unit_price'),
                ]
            ],
            "back_urls" => [
                "success" => 'localhost:3000',
                "failure" => 'localhost:3000',
                "pending" => 'localhost:3000',
            ],
            "auto_return" => "approved",
            "external_reference" => "ORD-1234" // Reference ID
        ];
        $preference = $preferenceClient->create($preferenceData);
        if (isset($preference->id) && isset($preference->init_point)) {
            return response()->json([
                'id' => $preference->id,
                'init_point' => $preference->init_point
            ]);
        } else {
            return response()->json(['error' => 'No se pudo crear la preferencia'], 500);
        }
    }
}
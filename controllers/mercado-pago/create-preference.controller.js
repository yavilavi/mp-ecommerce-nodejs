// SDK de Mercado Pago
import {MercadoPagoConfig, Preference} from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-8902774665784533-092911-fab78ca802b6475923ebb446b02fee62-1160743707',
    options: {
        integratorId: "dev_24c65fb163bf11ea96500242ac130004"
    }
});

export const createPreference = async (req, res) => {
    const preference = new Preference(client);
    console.log(JSON.stringify(req.body, null, 2));
    const {payer_info, external_reference, notification_url, items} = req.body;

    const newPreference = await preference.create({
        body: {
            payment_methods: {
                excluded_payment_methods: [{id: 'visa'}],
                installments: 6
            },
            payer: {
                name: payer_info.name,
                email: payer_info.email,
                phone: {
                    number: payer_info.phone
                },
                address: {
                    zip_code: payer_info.zip_code,
                    street_name: payer_info.street_name,
                    street_number: payer_info.street_number,
                }

            },
            items,
            external_reference,
            notification_url,
        },
    })

    res.json(newPreference);
}
const mp = new MercadoPago('APP_USR-9a464dc4-1ad8-4646-af03-1f18d41cd90c');
const startCheckout = (data) => {
    mp.bricks().create("wallet", "wallet_container", {
        initialization: {
            preferenceId: data.id,
            redirectMode: "modal"
        },
        customization: {
            texts: {
                valueProp: 'smart_option',
            },
        }
    });
    $("#pay-init-button").hide();
}
const createPreference = async (params) => {
    const data = {
        payer_info: {
            name: "Lalo Landa",
            email: "test_user_51300629@testuser.com",
            phone: "3137366721",
            zip_code: "050043",
            street_name: "calle falsa",
            street_number: "123",
        },
        items: [
            {
                id: Math.floor(1000 + Math.random() * 9000),
                title: params.title,
                description: "Dispositivo móvil de Tienda e-commerce",
                picture_url: `${window.location.origin}${params.img.replace('./', '/')}`,
                quantity: Number(params.unit),
                unit_price: Number(params.price),
            }
        ],
    }
    $.ajax({
        type: "POST",
        url: 'api/createPreference',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(data),
        success: startCheckout,
        headers: {
            'X-meli-session-id': MP_DEVICE_SESSION_ID
        }
    });
}
const startPayment = async () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const pay_button = $("#pay-init-button");
     pay_button.prop("disabled", true);
    try {
        await createPreference(params);
    } catch (e) {
        pay_button.show();
        pay_button.prop("disabled", false);
    }
}